
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

* ansible-playbook site.yml -i hosts

