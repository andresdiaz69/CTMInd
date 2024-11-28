# View: vw_Empleado_Correo

## Usa los objetos:
- [[spiga_PedidosComprasDiversas]]
- [[v_EmpleadosSpiga]]

```sql
create view vw_Empleado_Correo as
select distinct c.FkEmpleados,e.email_corporativo
FROM		spiga_PedidosComprasDiversas		c
left join	[DBMLC_0190].dbo.v_EmpleadosSpiga	e	on c.FkEmpleados = e.IdEmpleados

```
