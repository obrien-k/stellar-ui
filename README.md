# Stellar UI

This is a React-based SPA/UI for Stellar, the next generation mirage.

## Quick Start

See the [compose](https://github.com/orphic-inc/stellar-compose) repository for the fastest way to spin up an instance of Stellar.

## Requirements

- Node.js (only LTS version supported)

## Development Environment

    git clone https://github.com/orphic-inc/stellar-ui.git ui
    cd ui
    npm i
    npm start

Alternatively, you can simulate a production build with `npm run build`.

## Configuration

| Variable        | Description       | Default   |
| --------------- | ----------------- | --------- |
| STELLAR_API_URL | URL to API server | undefined |

## Invitation system

Stellar in it's default configuration requires an invitation to join an instance. You must create a user with a "SysOp" rank to have administrative priveleges. The default user rank is "User". Creating an invite generates a token that is sent to the provided email which can be used by the invitee to register an account. TODO: Invitation generation/expiration scheduling implementation.
