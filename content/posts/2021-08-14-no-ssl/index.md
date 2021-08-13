---
title: No-SSL
author: Alex Mor
date: 2021-08-11
hero: ./images/fast-scanner-competition.jpg
excerpt: Fast TLS v1.0 and TLS v1.1 scanner
---

## tl;dr
[no-ssl](https://github.com/nashcontrol/no-ssl) is a CLI tool that takes a list of domains as input and probes for support of legacy TLS 1.0 and TLS 1.1 protocols.

## Motivation

I tend to think that every (cybersecurity aware) company has a long term commitment to reduce its "external" attack surface, something similar to a 5 year plan that you keep on doing and updting every year, as we keep modernizing our technology stack and removing legacy applications.

As part of that initiative, the team created a pipeline dedicated to attack surface reduction where we contiuously scan our infrastrcure, leveraging open source vulnerability scanning tools, to look for low hanging fruits and quick wins.

Removing support for legacy protocols not only improves our security posture in the long term, but also enables us to identify legacy applications that need to be modernized with priority, as part of the digital transformation and cloud first approach.

We challanged ourselves to build a lightweight TLS/SSL scanner, capable of detecting web application servers supprting legacy TLS v1.0, TLS v1.1 and SSL v3 protocols.

**I won the challage.**

I started by researching which tools are available today that can be quickly introduced as another step in the scanning pipeline. I stumbled upon the collection of [dynamic security related helpers](https://github.com/vwt-digital/sec-helpers) by the Digital Ambition team of VolkerWessels Telecom, specifically the [nossl validation test](https://github.com/vwt-digital/sec-helpers/blob/develop/sec_helpers/no_ssl/__init__.py).
I quickly came to realize that if I wanted to detect servers supporting SSLv3, I need to have my OpenSSL version with SSLv3 enabled, which means I may need to build my own OpenSSL binary on the fly (as a pipeline step) or packed in a container, and then run the TLS/SSL scanner inside the container.

I was passionate about soloving this problem and presenting a simple and elegent solution, one where I could even practice writing some GO code (wanted to do that for a while), while deliving a tool that is easily installed, lightly designed and delivers fast results.

**I cheated.**

Doing some digging into GO's support for openssl and TLS, stumbled upon the [tls](https://pkg.go.dev/crypto/tls) package and found that it allows one to configure a MaxVersion property. This enabled me to define the maximum TLS version that is acceptable by the client (or server). I was able to build a TLS v1.0 and TLS v1.1 scanner overnight, skipping the feature for highlighting servers supporting SSL v3.

```go
url := "example.com:443"

// test for possible TLS 1.0 handshake
conn, err := tls.DialWithDialer(dialer, "tcp", url, &tls.Config{
    InsecureSkipVerify: true,
    MaxVersion: tls.VersionTLS10},
)

// confirm the host was found
if conn != nil {
    conn.Close()
}

// successfully connected with no errors  --> Supporting legacy TLS protocol!
if err == nil {
    fmt.Printf("Server https://%s supports TLS 1.0\n", url)
}
```

## No-SSL

Building upon the speed and simplicity of [httprobe](https://github.com/tomnomnom/httprobe) to identify live hosts supporting HTTPS communication, [no-ssl](https://github.com/nashcontrol/no-ssl) attempts to establish a TLS handshake, specifying TLS v1.0 as the maximum TLS version that is acceptable. If this fails, it then attempts to specify TLS v1.1 as the maximum supported version. Results are sent to `stdout`.

```shell
cat domains.txt | httprobe -s -p https:443 | no-ssl
Server https://example.com:443 supports TLS 1.0
Server https://example.net:443 supports TLS 1.1
```

---
Image by <a href="https://pixabay.com/users/thomaswolter-92511/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=655353">Thomas Wolter</a> from <a href="https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=655353">Pixabay</a>
