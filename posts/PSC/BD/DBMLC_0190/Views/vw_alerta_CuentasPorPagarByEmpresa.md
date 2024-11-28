# View: vw_alerta_CuentasPorPagarByEmpresa

## Usa los objetos:
- [[Empresas]]
- [[vw_alerta_CuentasPorPagar]]

```sql






CREATE VIEW [dbo].[vw_alerta_CuentasPorPagarByEmpresa]
AS
SELECT        
vw_alerta_CuentasPorPagar.Ano_Periodo, 
vw_alerta_CuentasPorPagar.Mes_Periodo, 
vw_alerta_CuentasPorPagar.IdEmpresas, 
dbo.Empresas.NombreEmpresa AS Empresa, 
dbo.Empresas.SiglaEmpresa, 
SUM(Valor) AS Valor

FROM            vw_alerta_CuentasPorPagar INNER JOIN
                         dbo.Empresas ON vw_alerta_CuentasPorPagar.IdEmpresas = dbo.Empresas.CodigoEmpresa

-- SOLO SE TIENEN EN CUENTA LAS DOCUMENTACIONES DE MM
WHERE 
(vw_alerta_CuentasPorPagar.TipoCP = 'CP' 
OR
(vw_alerta_CuentasPorPagar.TipoCP = 'DO' AND vw_alerta_CuentasPorPagar.IdEmpresas = 29 AND DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1) <= '20220501'))
AND 
vw_alerta_CuentasPorPagar.IDSpiga NOT IN (252485) -- JCS: 2022/09/21 POR SOLICITUD DE LUISA


GROUP BY 
vw_alerta_CuentasPorPagar.Ano_Periodo, 
vw_alerta_CuentasPorPagar.Mes_Periodo, 
vw_alerta_CuentasPorPagar.IdEmpresas,
dbo.Empresas.NombreEmpresa,
dbo.Empresas.SiglaEmpresa



```
