export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readingTime: string;
  content: string;
};

export const posts: Post[] = [
  {
    slug: "the-log-join-that-silently-disabled-tls-detection",
    title: "The Log Join That Silently Disabled TLS Detection",
    excerpt:
      "A detector that never fires isn't always a broken model — sometimes the data never reaches it. Notes on a Zeek log join bug in ODIN.",
    date: "2026-08-15",
    readingTime: "4 min",
    content: `In ODIN, TLS-wrapped malware detection works by looking at JA3/JA4 fingerprints from Zeek's \`ssl.log\` — no decryption involved, just the shape of the handshake. It was trained, tested, and wired into the pipeline. And on real traffic, it never fired. Not "rarely." Never.

The instinct when a detector goes quiet is to blame the model: bad threshold, distribution shift between training and live data, something statistical. I spent longer than I'd like to admit down that path before stepping back and checking the thing that's easy to assume is fine: whether the detector was actually *receiving* the rows I thought it was.

It wasn't. The pipeline joins Zeek's \`conn.log\` and \`ssl.log\` on a shared connection UID to attach TLS metadata to each flow. That join was silently dropping rows — not erroring, not logging a warning, just quietly returning fewer joined records than input records. Downstream, the detector was doing exactly what it was trained to do, on a dataset that had already been filtered down to near-nothing before it ever saw it.

Two things made this bug expensive rather than just annoying:

1. **It failed silently.** A crash is a bug report. A join that returns 40% as many rows as it should, with no error, just looks like "traffic was quiet today."
2. **A synthetic-only test set would never have caught it.** The join bug was a property of *real* Zeek log formatting — timing, field ordering, occasional malformed rows — that hand-built synthetic data doesn't reproduce because you already know what shape you expect the output to be.

The fix itself was small: validate the join key's presence and type before the join, and log a count of dropped rows instead of silently discarding them. The lesson I took from it was bigger — for any pipeline stage that merges or filters data, log what you *removed*, not just what you kept. A detector's accuracy is meaningless if you can't verify what data actually reached it.

It's also why ODIN's own docs are explicit about which detectors are validated against real captured traffic versus synthetic data only. After this bug, I didn't trust a detector's reported accuracy until I'd confirmed the data feeding it matched what I assumed it did.`,
  },
  {
    slug: "enforcing-policy-without-decrypting-traffic",
    title: "Enforcing Network Policy Without Decrypting Anything",
    excerpt:
      "The endpoint firewall needed to police encrypted connections without becoming a TLS-terminating proxy. JA3 and SNI turned out to be enough.",
    date: "2026-06-02",
    readingTime: "3 min",
    content: `Most of the traffic a host-based firewall needs to police today is encrypted, which means the obvious options — deep packet inspection, TLS termination and re-encryption — either don't work or introduce exactly the kind of trust boundary you're trying to avoid. Decrypting a process's traffic to decide whether to allow it defeats a fair amount of the point.

The endpoint application firewall I built instead treats the TLS handshake itself as the signal, not the payload behind it. Two fields do almost all the work:

- **SNI (Server Name Indication)** — sent in the clear during the handshake, before encryption kicks in, telling you which hostname the client is trying to reach. Enough to enforce "this process may talk to \`api.internal.corp\`, nothing else," without seeing a single encrypted byte.
- **JA3** — a fingerprint of *how* a TLS client negotiates (cipher suites, extensions, elliptic curves, in the order it offers them), rather than *what* it's saying. Different TLS libraries and versions produce different JA3 hashes even hitting the same server, which makes it useful for a narrower question than SNI: not just "where is this process connecting," but "does this process's TLS stack look like what I expect it to look like."

The other half of the design was attribution: mapping each outgoing connection back to the process that opened it, via \`/proc\` and netlink sockets, so policy isn't just "block this destination" but "this specific process may reach this specific destination, and nothing else may." A rule engine sits on top with allow/deny/throttle actions, plus a Flask REST console for managing policy across multiple endpoints instead of editing config files on each machine by hand.

None of this requires the firewall to see inside the encrypted channel at all — which is the point. The moment a security control needs to decrypt traffic to make a decision, that control becomes a target and a liability of its own. SNI and JA3 give you enough signal to enforce meaningful policy while leaving the actual encrypted conversation exactly as opaque to the firewall as it is to everyone else on the wire.`,
  },
];
