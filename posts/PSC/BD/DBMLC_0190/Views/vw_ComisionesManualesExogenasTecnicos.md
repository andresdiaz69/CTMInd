# View: vw_ComisionesManualesExogenasTecnicos

## Usa los objetos:
- [[ComisionesSpigaTallerPorOT]]
- [[EmpleadosRangosManualesMaestras]]
- [[vw_ComisionesMaestrasManuales]]

```sql
CREATE VIEW [com].[vw_ComisionesManualesExogenasTecnicos]
AS
SELECT ermm.IdRangoMaestra,      cmm.IdEsquema,          cmm.IdComisionModelo,  cstpot.CedulaOperario CodigoEmpleado,    
	   cstpot.Ano_Periodo,       cstpot.Mes_Periodo,     SUM(cstpot.UnidadesVendidas) UnidadesVendidas,                      
	   null UserIdCreo,          null FechaCreacion,     null UserIdModifico,    null FechaModificacion,   null IdCriterio, 
	   null IdEje,               null IdRegistro2,       null IdRangoMaestra2,   null CodigoEmpleado2,     null Ano_Periodo2,    
	   null Mes_Periodo2,        null ValorNovedad2,     null UserIdCreo2,       null FechaCreacion2,      null UserIdModifico2, 
	   null FechaModificacion2,  null IdCriterio2,       null IdEje2

	FROM dbo.ComisionesSpigaTallerPorOT cstpot
	INNER JOIN com.EmpleadosRangosManualesMaestras ermm ON ermm.CodigoEmpleado = cstpot.CedulaOperario
	join com.vw_ComisionesMaestrasManuales cmm on cmm.IdMaestra = ermm.IdRangoMaestra
	WHERE Ano_Periodo > 2023  
	GROUP BY ermm.IdRangoMaestra,  cmm.IdEsquema, cmm.IdComisionModelo, cstpot.CedulaOperario, cstpot.Ano_Periodo, cstpot.Mes_Periodo  


```
