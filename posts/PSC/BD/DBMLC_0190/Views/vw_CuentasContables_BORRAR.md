# View: vw_CuentasContables_BORRAR

## Usa los objetos:
- [[vw_InformesArbolesCuentas]]

```sql


create VIEW [dbo].[vw_CuentasContables] AS
SELECT	CodigoConcepto,NombreConcepto,Cuenta,NombreCuenta
FROM InformesComiteDB.dbo.vw_InformesArbolesCuentas
WHERE (cuenta like '4%' or cuenta like '6%')
and balance =17
and empresa =1

```
