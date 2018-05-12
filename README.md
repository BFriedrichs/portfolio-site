
website
=======

### requirements

-> deploy/config.yml
```yml
  mail:
    host: { host }
    user: { user }
    pw: { password }
```

-> deploy/hosts
```
  [webserver]
  { server_ip }
```

### deployment

* docker run -d --name main -e 'LETSENCRYPT_EMAIL=bjoern@friedrichs1.de' -e 'LETSENCRYPT_HOST=bjoern-friedrichs.de' -e 'VIRTUAL_HOST=bjoern-friedrichs.de' bfriedrichs/portfolio