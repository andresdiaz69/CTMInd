# View: vw_Presupuestos_Nomina_Departamentos

## Usa los objetos:
- [[vw_Presupuestos_DistribucionSalarios]]

```sql
CREATE VIEW vw_Presupuestos_Nomina_Departamentos
AS
select distinct nombre_departamento, codigo_departamento, Codigo_Marca
  from vw_Presupuestos_DistribucionSalarios
 WHERE codigo_departamento != 'TC'
```
