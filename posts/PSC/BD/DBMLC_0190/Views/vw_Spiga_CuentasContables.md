# View: vw_Spiga_CuentasContables

## Usa los objetos:
- [[spiga_puc]]

```sql
CREATE VIEW [dbo].[vw_Spiga_CuentasContables] AS
SELECT DISTINCT Cuenta = Codigocuenta,Nombre 
FROM [PSCService_DB].[dbo].[spiga_puc]
```
