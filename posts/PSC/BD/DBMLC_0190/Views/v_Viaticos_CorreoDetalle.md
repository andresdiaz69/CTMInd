# View: v_Viaticos_CorreoDetalle

## Usa los objetos:
- [[v_Viaticos_ParametrosEmpresas]]
- [[Viaticos_CorreoEnvio]]
- [[Viaticos_ParametrosArea]]

```sql

CREATE VIEW [dbo].[v_Viaticos_CorreoDetalle]
AS
SELECT        vc.IdCorreo, vc.Correo, vc.Activo, vc.CodigoEmpresa, vc.CodigoArea, ve.Empresa, vp.nombre_seccion, ve.Ano_Periodo, ve.Mes_Periodo
FROM            dbo.Viaticos_CorreoEnvio AS vc INNER JOIN
                         dbo.v_Viaticos_ParametrosEmpresas AS ve ON vc.CodigoEmpresa = ve.CodigoEmpresa INNER JOIN
                         dbo.Viaticos_ParametrosArea AS vp ON vc.CodigoArea = vp.Codigo_seccion AND vc.CodigoEmpresa = vp.CodigoEmpresa 
WHERE Ano_Periodo = YEAR(GETDATE())and Mes_Periodo =  month(getdate())


```
