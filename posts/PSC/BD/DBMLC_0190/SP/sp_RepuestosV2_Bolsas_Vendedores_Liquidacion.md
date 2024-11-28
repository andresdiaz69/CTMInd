# Stored Procedure: sp_RepuestosV2_Bolsas_Vendedores_Liquidacion

## Usa los objetos:
- [[ExogenasDiasLaborados]]
- [[vw_RangosMaestrasFull]]
- [[vw_RepuestosV2_Bolsas_Vendedores_4]]

```sql

-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[sp_RepuestosV2_Bolsas_Vendedores_Liquidacion]
	-- Add the parameters for the stored procedure here
	@Ano_Periodo as int, 
	@Mes_Periodo as int,
	@CodigoEmpresa as int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    IF OBJECT_ID('tempdb.dbo.temp_RepuestosV2_Bolsas_Vendedores_Liquidacion', N'U') IS NOT NULL
    DROP TABLE #temp_RepuestosV2_Bolsas_Vendedores_Liquidacion;


	CREATE TABLE #temp_RepuestosV2_Bolsas_Vendedores_Liquidacion
	(
	[Ano_Periodo] [int] NOT NULL,
	[Mes_Periodo] [int] NOT NULL,
	[CodigoEmpresa] [smallint] NOT NULL,
	[CedulaVendedorRepuestos] [bigint] NOT NULL,
	[CodigoEmpleado] [bigint] NOT NULL,
	[Empleado] [nvarchar](767) NULL,
	[FechaRetiro] [datetime] NULL,
	--Desde [decimal](38, 6) NULL,
	--Hasta [decimal](38, 6) NULL,
	[ValorBaseComision] [decimal](38, 6) NULL,
	[ValorBaseTotal] [decimal](38, 6) NULL,
	[CodigoCentro] [smallint] NULL,
	[NombreCentro] [nvarchar](255) NULL,
	[cod_marca] [nvarchar](255) NULL,
	[nombre_marca] [nvarchar](255) NULL,
	[CodigoCargo] [nvarchar](10) NULL,
	[NombreCargo] [nvarchar](255) NULL,
	[Participacion] [decimal](38, 6) NULL,
	[ValorBolsa] [decimal](18, 2) NULL,
	[Faltantes] [decimal](18, 2) NULL,
	[PesoBolsaVendedor] [decimal](18, 2) NULL,
	[TopeMaximoBolsa] [decimal](18, 2) NULL,
	[ValorBolsaVendedor] [decimal](38, 6) NULL,
	[Comision] [decimal](38, 6) NULL,
	[IdRangoMaestra] [smallint] NULL,
	[IdRangoVersionMax] [int] NULL,
	[IdComisionModeloSub] [smallint] NULL,
	[IdComisionModeloSubCriterio] [smallint] NULL,
	[CodigoConcepto] [int] NULL,
	[CodigoConceptoAux] [int] NULL,
	IdLiquidacion [int] not null,
	IdHistorico[int] not null,
	FechaLiquidacion [datetime] not null
	)





insert into #temp_RepuestosV2_Bolsas_Vendedores_Liquidacion
	
	SELECT

dbo.vw_RepuestosV2_Bolsas_Vendedores_4.Ano_Periodo, dbo.vw_RepuestosV2_Bolsas_Vendedores_4.Mes_Periodo, dbo.vw_RepuestosV2_Bolsas_Vendedores_4.CodigoEmpresa, 
                         dbo.vw_RepuestosV2_Bolsas_Vendedores_4.CedulaVendedorRepuestos, dbo.vw_RepuestosV2_Bolsas_Vendedores_4.CodigoEmpleado, dbo.vw_RepuestosV2_Bolsas_Vendedores_4.Empleado, 
                         dbo.vw_RepuestosV2_Bolsas_Vendedores_4.FechaRetiro, 
						 
						 --Desde,
						 --Hasta,
						 
						 dbo.vw_RepuestosV2_Bolsas_Vendedores_4.ValorBaseComision, dbo.vw_RepuestosV2_Bolsas_Vendedores_4.ValorBaseTotal, 
                         dbo.vw_RepuestosV2_Bolsas_Vendedores_4.CodigoCentro, dbo.vw_RepuestosV2_Bolsas_Vendedores_4.NombreCentro, dbo.vw_RepuestosV2_Bolsas_Vendedores_4.cod_marca, 
                         dbo.vw_RepuestosV2_Bolsas_Vendedores_4.nombre_marca, dbo.vw_RepuestosV2_Bolsas_Vendedores_4.CodigoCargo, dbo.vw_RepuestosV2_Bolsas_Vendedores_4.NombreCargo, 
                         dbo.vw_RepuestosV2_Bolsas_Vendedores_4.Participacion, dbo.vw_RepuestosV2_Bolsas_Vendedores_4.ValorBolsa, dbo.vw_RepuestosV2_Bolsas_Vendedores_4.Faltantes, 
                         dbo.vw_RepuestosV2_Bolsas_Vendedores_4.PesoBolsaVendedor, dbo.vw_RepuestosV2_Bolsas_Vendedores_4.TopeMaximoBolsa, dbo.vw_RepuestosV2_Bolsas_Vendedores_4.ValorBolsaVendedor, 
                         
						 dbo.vw_RepuestosV2_Bolsas_Vendedores_4.Comision AS Comision_AntesDiasLaborados, 
						 ISNULL(dbo.ExogenasDiasLaborados.DiasLaborados, 0) AS DiasLaborados, 
						 CASE WHEN ISNULL(dbo.ExogenasDiasLaborados.DiasLaborados, 0) = 0 THEN 0
						 ELSE (dbo.vw_RepuestosV2_Bolsas_Vendedores_4.Comision / 30) * ISNULL(dbo.ExogenasDiasLaborados.DiasLaborados, 0)
						 END AS Comision,

						 dbo.vw_RepuestosV2_Bolsas_Vendedores_4.IdRangoMaestra, 
                         dbo.vw_RepuestosV2_Bolsas_Vendedores_4.IdRangoVersionMax, dbo.vw_RepuestosV2_Bolsas_Vendedores_4.IdComisionModeloSub, dbo.vw_RepuestosV2_Bolsas_Vendedores_4.IdComisionModeloSubCriterio, 
                         dbo.vw_RangosMaestrasFull.CodigoConcepto, dbo.vw_RangosMaestrasFull.CodigoConceptoAux, 0 AS IdLiquidacion, 0 AS IdHistorico, GETDATE() AS FechaLiquidacion
FROM            dbo.vw_RepuestosV2_Bolsas_Vendedores_4 LEFT OUTER JOIN
                         dbo.ExogenasDiasLaborados ON dbo.vw_RepuestosV2_Bolsas_Vendedores_4.CodigoEmpleado = dbo.ExogenasDiasLaborados.CodigoEmpleado AND 
                         dbo.vw_RepuestosV2_Bolsas_Vendedores_4.Ano_Periodo = dbo.ExogenasDiasLaborados.Ano AND dbo.vw_RepuestosV2_Bolsas_Vendedores_4.Mes_Periodo = dbo.ExogenasDiasLaborados.Mes LEFT OUTER JOIN
                         dbo.vw_RangosMaestrasFull ON dbo.vw_RepuestosV2_Bolsas_Vendedores_4.IdRangoVersionMax = dbo.vw_RangosMaestrasFull.IdRangoVersion

						 where Ano_Periodo = @Ano_Periodo and Mes_Periodo =@Mes_Periodo and dbo.vw_RepuestosV2_Bolsas_Vendedores_4.CodigoEmpresa = @CodigoEmpresa


						

						 --select * from  #temp_RepuestosV2_Bolsas_Vendedores_Liquidacion 

--						 WHERE        

--(Desde < ValorBaseComision) 
--AND (Hasta >= ValorBaseComision) 
--AND (IdComisionModeloSub = 61) 
--AND (IdComisionModeloSubCriterio = 107)

--OR 

--(Desde < ValorBaseComision) 
--AND (Hasta >= ValorBaseComision) 
--AND (IdComisionModeloSub = 62) 
--AND (IdComisionModeloSubCriterio = 113)


DROP TABLE #temp_RepuestosV2_Bolsas_Vendedores_Liquidacion;

END

```
