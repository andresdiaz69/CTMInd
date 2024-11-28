# Stored Procedure: rs_gth_gth039_Sub1

## Usa los objetos:
- [[sp_GTH_EvadesemRes]]

```sql

--

CREATE PROCEDURE [dbo].[rs_gth_gth039_Sub1] 
	@EvaDesem	VARCHAR(6),
	@CodEmp		CHAR(12)

-- ======================================================================
-- Author:		Jorge Diaz
-- Create date: Febrero 26 de 2019
-- Description:	Notas por competencia de un empleado en una evaluación 
--
--				****************************************************************************************************
--				Observaciones:
--				Consulta para el subinforme del Reporte GTH039
--
-- 2020.04.17	Jorge Diaz
--				Se modificó código de la consulta, pasa de "usr_gth_RepGthUAT0102_Sub1" a "rs_gth_gth039_Sub1"
--
--				****************************************************************************************************
--
/*
EXEC rs_gth_gth039_Sub1 'EV8','1024567876'
*/
-- ======================================================================

AS
BEGIN
	SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
	SET NOCOUNT ON;
	
	DECLARE @v_GTH_EvaDesemComp_1 TABLE
	(
		[cod_eva_des] [varchar](6) NOT NULL,
		[cod_comp] [char](10) NULL,
		[nom_comp] [varchar](50) NULL,
		[niv_compor] [char](2) NOT NULL,
		[des_compor] [varchar](100) NOT NULL,
		[cod_comporta] [char](10) NULL,
		[des_comporta] [nvarchar](max) NULL,
		[cod_emp_evado] [char](12) NULL,
		[EMPLEADO] [varchar](MAX) NULL,
		[cod_emp_respond] [char](12) NULL,
		[EVALUADOR] [varchar](MAX) NULL,
		[cod_eva] [varchar](10) NOT NULL,
		[Nom_eva] [nvarchar](300) NULL,
		[num_pre] [tinyint] NOT NULL,
		[val_rta] [tinyint] NULL,
		[peso_preg] [numeric](6, 0) NOT NULL,
		[NotaPregunta] [numeric](16, 6) NULL,
		[NotaCuestionario] [numeric](16, 6) NULL,
		[Rol] [INT] NULL,
		[Peso_Evador] [numeric](5, 0) NULL,
		[defComportamiento_PregEvado] [numeric](26, 10) NULL,
		[defComportamiento_Evado] [numeric](38, 10) NULL,
		[PesoComportamiento] [numeric](6, 2) NOT NULL,
		[defCompetencia_Evado] [numeric](38, 16) NULL,
		[Fec_Ing] [DATETIME],
		[DefComportamiento] [numeric](26, 10) NULL,
		[DefNivel] [numeric](26, 10) NULL,
		[DefCompetencia] [numeric](26, 10) NULL,
		[PesoTotal] [numeric](5, 0) NULL,
		[NotaEvado] [numeric](16, 6) NULL,
		[NotaEval] [numeric](16, 6) NULL,
		[TotalNotaEvado] [numeric](16, 6) NULL,
		[NotaComporta] [numeric](26,6) NULL
	);

	INSERT
	INTO	@v_GTH_EvaDesemComp_1 
	EXEC	sp_GTH_EvadesemRes @EvaDesem, @CodEmp, '%', '%';

	SELECT cod_emp_evado, cod_comp, RTRIM(nom_comp) AS nom_comp, defCompetencia_Evado AS notaCompeten 
	FROM @v_GTH_EvaDesemComp_1 
	GROUP BY cod_emp_evado, cod_comp, nom_comp, defCompetencia_Evado 
	ORDER BY cod_emp_evado, cod_comp ASC;
	
	
END

```
