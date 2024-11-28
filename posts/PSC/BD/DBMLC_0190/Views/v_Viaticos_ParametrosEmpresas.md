# View: v_Viaticos_ParametrosEmpresas

## Usa los objetos:
- [[EmpleadosActivos]]

```sql






CREATE VIEW [dbo].[v_Viaticos_ParametrosEmpresas]
AS
SELECT DISTINCT CodigoEmpresa, Empresa,Ano_Periodo,Mes_Periodo
FROM            dbo.EmpleadosActivos where codigo_Seccion in ('425','206','208','426','214','434')
GROUP BY Empresa, CodigoEmpresa,Ano_Periodo,Mes_Periodo

```
