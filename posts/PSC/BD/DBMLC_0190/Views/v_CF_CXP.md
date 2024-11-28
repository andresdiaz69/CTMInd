# View: v_CF_CXP

## Usa los objetos:
- [[CF_CXP]]

```sql

CREATE VIEW [dbo].[v_CF_CXP] AS
SELECT	Ano_Periodo		,Mes_Periodo		,Tipo				,IdEmpresa				,NombreEmpresa 
	,CodLinea			,NombreLinea		,IdLinea AS Sigla	,CodCentro				,NombreCentro 
	,NombreSeccion		,IdTerceros			,NombreTercero		,IdTerceros_Pagador 	,NombreTerceros_Pagador 
	,Valor=SUM(Valor)
FROM CF_CXP
GROUP BY	Ano_Periodo		,Mes_Periodo			,Tipo						,IdEmpresa		
		,NombreEmpresa		,CodLinea				,NombreLinea				,IdLinea		
		,CodCentro			,NombreCentro 			,NombreSeccion				,IdTerceros			
		,NombreTercero		,IdTerceros_Pagador 	,NombreTerceros_Pagador

```
