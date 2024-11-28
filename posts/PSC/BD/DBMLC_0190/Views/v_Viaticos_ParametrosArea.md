# View: v_Viaticos_ParametrosArea

## Usa los objetos:
- [[EmpleadosActivos]]

```sql



CREATE VIEW [dbo].[v_Viaticos_ParametrosArea]
AS

SELECT DISTINCT CodigoEmpresa,ltrim(rtrim(nombre_seccion)) as nombre_seccion, ltrim(rtrim(codigo_seccion)) as codigo_seccion , Ano_Periodo , Mes_Periodo
FROM            dbo.EmpleadosActivos where codigo_Seccion in ('425','206','208','426','214','434')



```
