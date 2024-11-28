# View: vw_ComisionesManualesVendedoresItinerantesBonaparte

## Usa los objetos:
- [[EmpleadosRangosManualesMaestras]]
- [[vw_ComisionesMaestrasManuales]]
- [[vw_ComisionesManualesVendedoresItinerantesBonaparteDetalles]]

```sql

CREATE VIEW [com].[vw_ComisionesManualesVendedoresItinerantesBonaparte]
AS

SELECT ermm.IdRangoMaestra,      cmm.IdEsquema,          cmm.IdComisionModelo,   cvi.CedulaVendedorRepuestos CodigoEmpleado,    
	   cvi.Ano_Periodo,          cvi.Mes_Periodo,        SUM(cvi.ValorBaseMostrador) UnidadesVendidas,                      
	   null UserIdCreo,          null FechaCreacion,     null UserIdModifico,    null FechaModificacion,   null IdCriterio, 
	   null IdEje,               null IdRegistro2,       null IdRangoMaestra2,   null CodigoEmpleado2,     null Ano_Periodo2,    
	   null Mes_Periodo2,        null ValorNovedad2,     null UserIdCreo2,       null FechaCreacion2,      null UserIdModifico2, 
	   null FechaModificacion2,  null IdCriterio2,       null IdEje2

	FROM (select Ano_Periodo, Mes_Periodo, CodigoEmpresa, CedulaVendedorRepuestos, SUM(ValorBaseMostrador) AS ValorBaseMostrador
			from vw_ComisionesManualesVendedoresItinerantesBonaparteDetalles
			GROUP BY Ano_Periodo, Mes_Periodo, CodigoEmpresa, CedulaVendedorRepuestos) cvi
	INNER JOIN com.EmpleadosRangosManualesMaestras ermm ON ermm.CodigoEmpleado = cvi.CedulaVendedorRepuestos
	join com.vw_ComisionesMaestrasManuales cmm on cmm.IdMaestra = ermm.IdRangoMaestra
	GROUP BY ermm.IdRangoMaestra,  cmm.IdEsquema, cmm.IdComisionModelo, cvi.CedulaVendedorRepuestos, cvi.Ano_Periodo, cvi.Mes_Periodo  



```
