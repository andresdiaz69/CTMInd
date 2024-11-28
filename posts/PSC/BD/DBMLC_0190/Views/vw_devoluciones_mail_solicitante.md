# View: vw_devoluciones_mail_solicitante

## Usa los objetos:
- [[AspNetUsers]]
- [[Devoluciones_Solicitud]]

```sql
create view vw_devoluciones_mail_solicitante as
select distinct s.IdSolicitud,s.IdEmpleado,a.Email
from		Devoluciones_Solicitud	s
left join	AspNetUsers				a	on	s.IdEmpleado = a.UserName


```
