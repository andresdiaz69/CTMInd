# Stored Procedure: sp_alerta_CajasSaldos_ComparativoDiario

## Usa los objetos:
- [[vw_alerta_CajasSaldos]]

```sql


-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[sp_alerta_CajasSaldos_ComparativoDiario]
	-- Add the parameters for the stored procedure here
	@FechaDeCorte_Actual as datetime, 
	@FechaDeCorte_Anterior as datetime
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

SELECT        

ISNULL(PERIODO_ACT.Ano_Periodo, PERIODO_ANT.Ano_Periodo) AS Ano_Periodo, 
ISNULL(PERIODO_ACT.Mes_Periodo, PERIODO_ANT.Mes_Periodo) AS Mes_Periodo, 

PERIODO_ACT.FechaDeCorte AS FechaDeCorte_Actual, 
PERIODO_ANT.FechaDeCorte AS FechaDeCorte_Anterior, 

--ISNULL(PERIODO_ACT.IDEmpresa, PERIODO_ANT.IDEmpresa) AS IDEmpresa, 
--ISNULL(PERIODO_ACT.Empresa, PERIODO_ANT.Empresa) AS Empresa, 
ISNULL(PERIODO_ACT.IdEmpresas, PERIODO_ANT.IdEmpresas) AS IdEmpresas, 
ISNULL(PERIODO_ACT.SiglaEmpresa, PERIODO_ANT.SiglaEmpresa) AS SiglaEmpresa,
ISNULL(PERIODO_ACT.NombreEmpresa, PERIODO_ANT.NombreEmpresa) AS NombreEmpresa,
ISNULL(PERIODO_ACT.IdCentros, PERIODO_ANT.IdCentros) AS IdCentros, 
ISNULL(PERIODO_ACT.NombreCentro, PERIODO_ANT.NombreCentro) AS NombreCentro, 
--ISNULL(PERIODO_ACT.IDLineaDeNegocio_Sugerida, PERIODO_ANT.IDLineaDeNegocio_Sugerida) AS IDLineaDeNegocio_Sugerida, 
--ISNULL(PERIODO_ACT.LineaDeNegocio_Sugerida, PERIODO_ANT.LineaDeNegocio_Sugerida) AS LineaDeNegocio_Sugerida, 
ISNULL(PERIODO_ACT.IdCajas, PERIODO_ANT.IdCajas) AS IdCajas, 
ISNULL(PERIODO_ACT.NombreCaja, PERIODO_ANT.NombreCaja) AS NombreCaja, 
ISNULL(PERIODO_ACT.IdTipos, PERIODO_ANT.IdTipos) AS IdTipos, 
ISNULL(PERIODO_ACT.Tipos, PERIODO_ANT.Tipos) AS Tipos, 

--ISNULL(PERIODO_ACT.Saldo, 0) AS Saldo_Actual, 
--ISNULL(PERIODO_ANT.Saldo, 0) AS Saldo_Anterior,
--ISNULL(PERIODO_ACT.Saldo, 0) - ISNULL(PERIODO_ANT.Saldo, 0) AS Diferencia
-- AHORA SE HACE POR EL CAMPO SaldoMoneda POR SOLICITUD DE JC ARIAS (INCONSISTENCIA CAJA YENES)
ISNULL(PERIODO_ACT.SaldoMoneda, 0) AS Saldo_Actual, 
ISNULL(PERIODO_ANT.SaldoMoneda, 0) AS Saldo_Anterior,
ISNULL(PERIODO_ACT.SaldoMoneda, 0) - ISNULL(PERIODO_ANT.SaldoMoneda, 0) AS Diferencia

FROM            

(SELECT        
--Ano_Periodo, Mes_Periodo, FechaDeCorte, IDEmpresa, Empresa, SiglaEmpresa, IdEmpresas, IdCentros, NombreCentro, IDLineaDeNegocio_Sugerida, LineaDeNegocio_Sugerida, IdCajas, NombreCaja, IdTipos, 
Ano_Periodo, Mes_Periodo, FechaDeCorte, IdEmpresas, SiglaEmpresa, NombreEmpresa, IdCentros, NombreCentro, IdCajas, NombreCaja, IdTipos,
                                                    Tipos, Saldo, SaldoMoneda
                          FROM            vw_alerta_CajasSaldos
                          WHERE        (FechaDeCorte = @FechaDeCorte_Actual)) 
						  AS PERIODO_ACT 
						  
						  FULL OUTER JOIN

(SELECT        
--Ano_Periodo, Mes_Periodo, FechaDeCorte, IDEmpresa, Empresa, SiglaEmpresa, IdEmpresas, IdCentros, NombreCentro, IDLineaDeNegocio_Sugerida, LineaDeNegocio_Sugerida, IdCajas, NombreCaja, IdTipos, 
Ano_Periodo, Mes_Periodo, FechaDeCorte, IdEmpresas, SiglaEmpresa, NombreEmpresa, IdCentros, NombreCentro, IdCajas, NombreCaja, IdTipos, 
                                                         Tipos, Saldo, SaldoMoneda
                               FROM            vw_alerta_CajasSaldos AS vw_alerta_CajasSaldos_1
                               WHERE        (FechaDeCorte = @FechaDeCorte_Anterior)) 
							   AS PERIODO_ANT 
							   
ON PERIODO_ACT.IdTipos = PERIODO_ANT.IdTipos 
AND PERIODO_ACT.IdCajas = PERIODO_ANT.IdCajas 
--AND PERIODO_ACT.IDLineaDeNegocio_Sugerida = PERIODO_ANT.IDLineaDeNegocio_Sugerida 
AND PERIODO_ACT.IdCentros = PERIODO_ANT.IdCentros 
AND PERIODO_ACT.IdEmpresas = PERIODO_ANT.IdEmpresas 
--AND PERIODO_ACT.IDEmpresa = PERIODO_ANT.IDEmpresa

END

```
