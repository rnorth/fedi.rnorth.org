# GoToSocial on fly.io

This repository contains:

* configuration files for deploying [GoToSocial](https://github.com/superseriousbusiness/gotosocial) to [fly.io](https://fly.io). SQLite is used as the database backend, stored in a fly.io volume, along with storage for media etc.
* a Cloudflare worker to allow `.well-known` paths to be served from rnorth.org, as an alias to fedi.rnorth.org

**Important:** this repository is not intended to be a general-purpose guide to deploying GoToSocial to fly.io. It is intended to be a reference for my own deployment, and may not be suitable for your own deployment. You will absolutely need to make changes to the configuration files to suit your own needs.

## Problems

* GoToSocial is still in alpha state, and is not yet suitable for production use.
* GoToSocial's OIDC support makes it impossible to have admin users when using Google as the IDP provider _and_ using non-workspace (free) Google accounts for auth. I've not yet got around to filing an issue for this. Disabling OIDC would be recommended.
* I've not yet documented the manual steps involved in setting up an instance.
* This whole setup revolves around running a single instance of GoToSocial. This is clearly not a problem for a personal instance, but it could be a problem for a larger instance. Aside from just scaling vertically, it would be interesting to explore fly.io's [fly-replay](https://fly.io/docs/getting-started/multi-region-databases/) feature to split traffic between multiple read-only instances and a single read-write instance. GoToSocial does not support this natively; I've considered but not explored the possibility of proxying non-GET requests to the read-write instance.