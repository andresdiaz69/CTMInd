# Stored Procedure: sp_ClubIntegralComercial_Creditos_Detalles

## Usa los objetos:
- [[vw_ClubIntegralComercialAC_Informe_total]]

```sql


CREATE PROCEDURE [dbo].[sp_ClubIntegralComercial_Creditos_Detalles] 

--PARAMETROS
AS
BEGIN

--COMPROBANDO SI LA TABLA YA EXITE 
	IF OBJECT_ID (N'dbo.ClubIntegralComercialCentros_Detalles', N'U') IS NOT NULL
		DROP TABLE dbo.ClubIntegralComercialCentros_Detalles

--INFORMACION
SELECT Ano_periodo,CodigoCentro,NombreCentro,Convert(smallint,Trimestre)Trimestre,VehiculosRecaudados,[BANCO_DE_BOGOTA],BBVA,FINANZAUTO,DAVIVIENDA,FINANDINA,OCCIDENTE,BANCOLOMBIA,RCI,AUTORIZADAS,NO_AUTORIZADAS,TotalCreditos
INTO ClubIntegralComercialCentros_Detalles
FROM
(
SELECT  t.Ano_periodo,t.CodigoCentro,t.NombreCentro,t.Trimestre
,sum(t.[VehiculosRecaudados])VehiculosRecaudados,sum(t.[BANCO DE BOGOTA])[BANCO_DE_BOGOTA],sum(t.[BBVA])BBVA
,sum(t.[FINANZAUTO])FINANZAUTO,sum(t.[DAVIVIENDA])DAVIVIENDA,sum(t.[FINANDINA])FINANDINA
,sum(t.[OCCIDENTE])OCCIDENTE,sum(t.[BANCOLOMBIA])BANCOLOMBIA,sum(t.[RCI])RCI
,sum(t.[AUTORIZADAS])AUTORIZADAS,sum(t.[NO_AUTORIZADAS])NO_AUTORIZADAS,sum(t.[TotalCreditos])TotalCreditos
FROM vw_ClubIntegralComercialAC_Informe_total t
group by t.Ano_periodo,t.CodigoCentro,t.NombreCentro,t.Trimestre
)A

END

```
