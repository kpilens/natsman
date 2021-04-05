# NATS Man

Like postman but for nats

## Example

- `pattern` : This is the `@MessagePattern` decorator argument see docs
- `data`: This is your request payload from your application.

Sample request payload

```json
{
    "pattern": {
        "cmd": "CREATE_DATASOURCE",
    },
    "message": {
        "data": {
            "name": "andrew",
            "workspace": "remote"
        },
        "metadata": {
            "user_id": "5435121d1212"
        }

    }
}
```

```json
{
    "pattern": {
        "cmd": "CREATE_DATASOURCE",
        "role": "owner"
    },
    "message": {
        "data": {
            "name": "andrew",
            "workspace": "remote"
        },
        "metadata": {
            "user_id": "5435121d1212"
        }

    }
}
```

Note that `@MessagePattern` uses a strict pattern matching, so a handler can only executes a pattern that matches. in the examples above, even though the `cmd` are the same, both requests can not be the same, as the pattern must match the `cmd & role` payload within the pattern object.

