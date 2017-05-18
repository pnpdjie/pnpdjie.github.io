---
title: this is my test file
---

{% capture article %}
This page shows how to ...

* Do this.
* Do this too.

## Doing ...

1. Do this.
1. Do this next. Possibly read this [related explanation](...).
{% endcapture %}

{% include templates/home.md %}
