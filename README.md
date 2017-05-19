
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

* ssh-add
* ansible-playbook site.yml -i hosts
