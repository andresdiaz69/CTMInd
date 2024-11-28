# Stored Procedure: sp_rhh_PlaUnica_RegCorrec

## Usa los objetos:
- [[Rhh_PlaUnica_Reg01]]
- [[Rhh_PlaUnica_Reg01]]
- [[Rhh_PlaUnica_Reg02]]
- [[Rhh_PlaUnica_Reg02]]
- [[sp_rhh_LiqErrInfo]]

```sql
CREATE PROCEDURE [dbo].[sp_rhh_PlaUnica_RegCorrec]
	@Ano        CHAR(4),
	@Per        CHAR(2),
	@CodCia     CHAR(3),
	@Num_Pl_Aso CHAR(10),
	@CodSuc     CHAR(3)
--WITH ENCRYPTION
AS
BEGIN
    SET NOCOUNT ON;
    SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;

    DECLARE @nErrores SMALLINT;
    DECLARE @cMsgErr VARCHAR(MAX);
    DECLARE @Num_Rad VARCHAR(10);
    DECLARE @Num_Emp BIGINT;
    DECLARE @Val_nom BIGINT = 0;
    DECLARE @cDec376 BIT = 0;

    IF @Per = '14'
    BEGIN
	   --SET @cDec376 = 1;
	   SET @Per = '04';
    END;
    IF @Per = '15'
    BEGIN
	   --SET @cDec376 = 1;
	   SET @Per = '05';
    END;

    SET @nErrores = 0;

    IF @CodSuc IS NULL OR @CodSuc = ''
    BEGIN
	   SET @CodSuc = '%';
    END;

    IF OBJECT_ID('TempDb..#t_ErrorPLC') IS NULL
    BEGIN
	   CREATE TABLE #t_ErrorPLC(
		   cod_error INT,
		   error     VARCHAR(1000) COLLATE DATABASE_DEFAULT NULL,
		   ano       CHAR(4) COLLATE DATABASE_DEFAULT NULL,
		   per       CHAR(2) COLLATE DATABASE_DEFAULT NULL,
		   NumTemp   CHAR(10) COLLATE DATABASE_DEFAULT NULL,
		   codigo    INT
						  );
    END;

    /** Borra las planillas de corrección que no se hayan radicado***/

    DELETE dbo.Rhh_PlaUnica_Reg01
    WHERE Rhh_PlaUnica_Reg01.Tip_planilla = 'C' AND Rhh_PlaUnica_Reg01.Num_Rad LIKE '<%';

    /** Selecciona la planilla generada con las nuevas modificaciones con el nro de radicación a corregir **/
    SELECT @Num_Rad = Rhh_PlaUnica_Reg01.Num_rad
    FROM dbo.Rhh_PlaUnica_Reg01
    WHERE Rhh_PlaUnica_Reg01.Ano = @Ano
		AND Rhh_PlaUnica_Reg01.Per = @Per
		AND Rhh_PlaUnica_Reg01.Num_Planill_Aso = @Num_Pl_Aso
		AND Rhh_PlaUnica_Reg01.Num_Rad LIKE '<%'
		AND Rhh_PlaUnica_Reg01.Tip_planilla = 'N';

    DELETE dbo.Rhh_PlaUnica_Reg02
    WHERE Rhh_PlaUnica_Reg02.Num_Rad LIKE '<%' AND Rhh_PlaUnica_Reg02.Num_Rad <> @Num_Rad;

    /** Valida que exista diferencia positiva  entre la planilla radicada y la planilla de corrección ***/

    IF OBJECT_ID('TempDb..#t_Rhh_PlaUnicaCrr') IS NULL
    BEGIN
	   CREATE TABLE #t_Rhh_PlaUnicaCrr(
		   cod_cia         CHAR(3) COLLATE DATABASE_DEFAULT,
		   ano             CHAR(4) COLLATE DATABASE_DEFAULT,
		   per             CHAR(2) COLLATE DATABASE_DEFAULT,
		   Num_Rad         CHAR(10) COLLATE DATABASE_DEFAULT,
		   Secuen          INT,
		   NumIde_Em       VARCHAR(15) COLLATE DATABASE_DEFAULT,
		   Tip_Planilla    VARCHAR(1) COLLATE DATABASE_DEFAULT,
		   ibc_pen         BIGINT,
		   ibc_sal         BIGINT,
		   ibc_rie         BIGINT,
		   vae_fsp_solid   BIGINT,
		   vae_fsp_subsist BIGINT,
		   val_CCF         BIGINT,
		   val_SENA        BIGINT,
		   val_ICBF        BIGINT,
		   cot_pen         BIGINT,
		   cot_sal         BIGINT,
		   cot_rie         BIGINT,
		   Cot_Exo         VARCHAR(1) COLLATE DATABASE_DEFAULT,
		   vve_pen         BIGINT,
		   nov_sln         CHAR(1),
		   nov_ing         CHAR(1),
		   nov_ret         CHAR(1),
		   dia_pen         INT,
		   dia_sal         INT,
		   dia_rie         INT,
		   dia_ccf         INT,
		   sal_bas         MONEY,
		   base_ccf        MONEY,
		   FechaIngreso    DATETIME,
		   FechaRetiro     DATETIME,
		   FechaInicioVSP  DATETIME,
		   FechaInicioSLN  DATETIME,
		   FechafinSLN     DATETIME,
		   FechaInicioIEG  DATETIME,
		   FechafinIEG     DATETIME,
		   FechaInicioLMA  DATETIME,
		   FechafinLMA     DATETIME,
		   FechaInicioVac  DATETIME,
		   FechafinVac     DATETIME,
		   FechaInicioVct  DATETIME,
		   FechafinVct     DATETIME,
		   FechaInicioIrl  DATETIME,
		   FechafinIrl     DATETIME
							    );
    END;

    IF OBJECT_ID('TempDb..#t_Rhh_datosFaltantes') IS NULL
    BEGIN
	   CREATE TABLE #t_Rhh_datosFaltantes(
		   cod_cia         CHAR(3) COLLATE DATABASE_DEFAULT,
		   ano             CHAR(4) COLLATE DATABASE_DEFAULT,
		   per             CHAR(2) COLLATE DATABASE_DEFAULT,
		   Num_Rad         CHAR(10) COLLATE DATABASE_DEFAULT,
		   Secuen          INT,
		   NumIde_Em       VARCHAR(15) COLLATE DATABASE_DEFAULT,
		   Tip_Planilla    VARCHAR(1) COLLATE DATABASE_DEFAULT,
		   ibc_pen         BIGINT,
		   ibc_sal         BIGINT,
		   ibc_rie         BIGINT,
		   vae_fsp_solid   BIGINT,
		   vae_fsp_subsist BIGINT,
		   val_CCF         BIGINT,
		   val_SENA        BIGINT,
		   val_ICBF        BIGINT,
		   cot_pen         BIGINT,
		   cot_sal         BIGINT,
		   cot_rie         BIGINT,
		   Cot_Exo         VARCHAR(1) COLLATE DATABASE_DEFAULT,
		   vve_pen         BIGINT,
		   nov_sln         CHAR(1),
		   nov_ing         CHAR(1),
		   nov_ret         CHAR(1),
		   dia_pen         INT,
		   dia_sal         INT,
		   dia_rie         INT,
		   dia_ccf         INT,
		   sal_bas         MONEY,
		   base_ccf        MONEY,
		   FechaIngreso    DATETIME,
		   FechaRetiro     DATETIME,
		   FechaInicioVSP  DATETIME,
		   FechaInicioSLN  DATETIME,
		   FechafinSLN     DATETIME,
		   FechaInicioIEG  DATETIME,
		   FechafinIEG     DATETIME,
		   FechaInicioLMA  DATETIME,
		   FechafinLMA     DATETIME,
		   FechaInicioVac  DATETIME,
		   FechafinVac     DATETIME,
		   FechaInicioVct  DATETIME,
		   FechafinVct     DATETIME,
		   FechaInicioIrl  DATETIME,
		   FechafinIrl     DATETIME
								  );
    END;

    -- Se seleccionan los registros reportados en la planilla radicada y la nueva generada
    INSERT INTO #t_Rhh_PlaUnicaCrr
    SELECT MAX(cod_cia) AS COD_CIA,
		 MAX(ano) AS ANO,
		 MAX(per) AS PER,
		 MAX(Num_Rad) AS Num_rad,
		 MAX(Secuen) AS Secuencia,
		 NumIde_Em,
		 MAX(Tip_Planilla) AS Tip_Planilla,
		 ibc_pen,
		 ibc_sal,
		 ibc_rie,
		 vae_fsp_solid,
		 vae_fsp_subsist,
		 val_CCF,
		 val_SENA,
		 val_ICBF,
		 cot_pen,
		 cot_sal,
		 cot_rie,
		 Cot_Exo,
		 vve_pen,
		 nov_sln,
		 nov_ing,
		 nov_ret,
		 dia_pen,
		 dia_sal,
		 dia_rie,
		 dia_ccf,
		 sal_bas,
		 base_ccf,
		 FechaIngreso,
		 FechaRetiro,
		 FechaInicioVSP,
		 FechaInicioSLN,
		 FechafinSLN,
		 FechaInicioIEG,
		 FechafinIEG,
		 FechaInicioLMA,
		 FechafinLMA,
		 FechaInicioVac,
		 FechafinVac,
		 FechaInicioVct,
		 FechafinVct,
		 FechaInicioIrl,
		 FechafinIrl
    FROM Rhh_PlaUnica_Reg02
    WHERE ano = @Ano
		AND PER = @Per
		AND (Num_Rad = @Num_Pl_Aso OR Num_Rad LIKE '<%'
		    )
    GROUP BY NumIde_Em,
		   ibc_pen,
		   ibc_sal,
		   ibc_rie,
		   cot_pen,
		   vae_fsp_solid,
		   vae_fsp_subsist,
		   val_CCF,
		   val_SENA,
		   val_ICBF,
		   cot_pen,
		   cot_sal,
		   cot_rie,
		   ano,
		   per,
		   Cot_Exo,
		   vve_pen,
		   nov_sln,
		   nov_ing,
		   nov_ret,
		   FechaIngreso,
		   FechaRetiro,
		   FechaInicioVSP,
		   FechaInicioSLN,
		   FechafinSLN,
		   FechaInicioIEG,
		   FechafinIEG,
		   FechaInicioLMA,
		   FechafinLMA,
		   FechaInicioVac,
		   FechafinVac,
		   FechaInicioVct,
		   FechafinVct,
		   FechaInicioIrl,
		   FechafinIrl,
		   dia_pen,
		   dia_sal,
		   dia_rie,
		   dia_ccf,
		   sal_bas,
		   base_ccf
    HAVING COUNT(NumIde_Em) = 1
    ORDER BY Num_rad,
		   NumIde_Em,
		   Secuencia;
		    
    /* Compara los Registros de la tabla #t_Rhh_PlaUnicaCrr (Contiene los registros tipo 2 que contienen diferencias) */

    SELECT NumIde_Em,
		 Secuen,
		 ibc_pen,
		 ibc_sal,
		 ibc_rie,
		 vae_fsp_solid,
		 vae_fsp_subsist,
		 val_CCF,
		 val_SENA,
		 val_ICBF,
		 cot_pen,
		 cot_sal,
		 cot_rie,
		 cot_exo,
		 dia_pen,
		 dia_sal,
		 dia_rie,
		 dia_ccf,
		 sal_bas,
		 Base_ccf,
		 vve_pen,
		 FechaIngreso,
		 FechaRetiro,
		 FechaInicioVSP,
		 FechaInicioSLN,
		 FechafinSLN,
		 FechaInicioIEG,
		 FechafinIEG,
		 FechaInicioLMA,
		 FechafinLMA,
		 FechaInicioVac,
		 FechafinVac,
		 FechaInicioVct,
		 FechafinVct,
		 FechaInicioIrl,
		 FechafinIrl,
		 ISNULL(ibc_pen - LEAD(ibc_pen) OVER(PARTITION BY NumIde_Em,
												FechaIngreso,
												FechaInicioVSP,
												FechaInicioSLN,
												FechafinSLN,
												FechaInicioIEG,
												FechafinIEG,
												FechaInicioLMA,
												FechafinLMA,
												FechaInicioVac,
												FechafinVac,
												FechaInicioVct,
												FechafinVct,
												FechaInicioIrl
			   ORDER BY Num_Rad,
					  NumIde_Em,
					  FechaInicioVSP,
					  FechaInicioSLN,
					  FechafinSLN,
					  FechaInicioIEG,
					  FechafinIEG,
					  FechaInicioLMA,
					  FechafinLMA,
					  FechaInicioVac,
					  FechafinVac,
					  FechaInicioVct,
					  FechafinVct,
					  FechaInicioIrl), 0) AS dif_ibc_pen,
		 ISNULL(ibc_sal - LEAD(ibc_sal) OVER(PARTITION BY NumIde_Em,
												FechaIngreso,
												FechaInicioVSP,
												FechaInicioSLN,
												FechafinSLN,
												FechaInicioIEG,
												FechafinIEG,
												FechaInicioLMA,
												FechafinLMA,
												FechaInicioVac,
												FechafinVac,
												FechaInicioVct,
												FechafinVct,
												FechaInicioIrl
			   ORDER BY Num_Rad,
					  NumIde_Em,
					  FechaIngreso,
					  FechaRetiro,
					  FechaInicioVSP,
					  FechaInicioSLN,
					  FechafinSLN,
					  FechaInicioIEG,
					  FechafinIEG,
					  FechaInicioLMA,
					  FechafinLMA,
					  FechaInicioVac,
					  FechafinVac,
					  FechaInicioVct,
					  FechafinVct,
					  FechaInicioIrl), 0) AS dif_ibc_sal,
		 ISNULL(ibc_rie - LEAD(ibc_rie) OVER(PARTITION BY NumIde_Em,
												FechaIngreso,
												FechaInicioVSP,
												FechaInicioSLN,
												FechafinSLN,
												FechaInicioIEG,
												FechafinIEG,
												FechaInicioLMA,
												FechafinLMA,
												FechaInicioVac,
												FechafinVac,
												FechaInicioVct,
												FechafinVct,
												FechaInicioIrl
			   ORDER BY Num_Rad,
					  NumIde_Em,
					  FechaIngreso,
					  FechaRetiro,
					  FechaInicioVSP,
					  FechaInicioSLN,
					  FechafinSLN,
					  FechaInicioIEG,
					  FechafinIEG,
					  FechaInicioLMA,
					  FechafinLMA,
					  FechaInicioVac,
					  FechafinVac,
					  FechaInicioVct,
					  FechafinVct,
					  FechaInicioIrl), 0) AS dif_ibc_rie,
		 ISNULL(vae_fsp_solid - LEAD(vae_fsp_solid) OVER(PARTITION BY NumIde_Em,
														  FechaIngreso,
														  FechaInicioVSP,
														  FechaInicioSLN,
														  FechafinSLN,
														  FechaInicioIEG,
														  FechafinIEG,
														  FechaInicioLMA,
														  FechafinLMA,
														  FechaInicioVac,
														  FechafinVac,
														  FechaInicioVct,
														  FechafinVct,
														  FechaInicioIrl
			   ORDER BY Num_Rad,
					  NumIde_Em,
					  FechaIngreso,
					  FechaRetiro,
					  FechaInicioVSP,
					  FechaInicioSLN,
					  FechafinSLN,
					  FechaInicioIEG,
					  FechafinIEG,
					  FechaInicioLMA,
					  FechafinLMA,
					  FechaInicioVac,
					  FechafinVac,
					  FechaInicioVct,
					  FechafinVct,
					  FechaInicioIrl), 0) AS dif_vae_fsp_solid,
		 ISNULL(vae_fsp_subsist - LEAD(vae_fsp_subsist) OVER(PARTITION BY NumIde_Em,
															 FechaIngreso,
															 FechaInicioVSP,
															 FechaInicioSLN,
															 FechafinSLN,
															 FechaInicioIEG,
															 FechafinIEG,
															 FechaInicioLMA,
															 FechafinLMA,
															 FechaInicioVac,
															 FechafinVac,
															 FechaInicioVct,
															 FechafinVct,
															 FechaInicioIrl
			   ORDER BY Num_Rad,
					  NumIde_Em,
					  FechaIngreso,
					  FechaRetiro,
					  FechaInicioVSP,
					  FechaInicioSLN,
					  FechafinSLN,
					  FechaInicioIEG,
					  FechafinIEG,
					  FechaInicioLMA,
					  FechafinLMA,
					  FechaInicioVac,
					  FechafinVac,
					  FechaInicioVct,
					  FechafinVct,
					  FechaInicioIrl), 0) AS dif_vae_fsp_subsist,
		 ISNULL(val_CCF - LEAD(val_CCF) OVER(PARTITION BY NumIde_Em,
												FechaIngreso,
												FechaInicioVSP,
												FechaInicioSLN,
												FechafinSLN,
												FechaInicioIEG,
												FechafinIEG,
												FechaInicioLMA,
												FechafinLMA,
												FechaInicioVac,
												FechafinVac,
												FechaInicioVct,
												FechafinVct,
												FechaInicioIrl
			   ORDER BY Num_Rad,
					  NumIde_Em,
					  FechaIngreso,
					  FechaRetiro,
					  FechaInicioVSP,
					  FechaInicioSLN,
					  FechafinSLN,
					  FechaInicioIEG,
					  FechafinIEG,
					  FechaInicioLMA,
					  FechafinLMA,
					  FechaInicioVac,
					  FechafinVac,
					  FechaInicioVct,
					  FechafinVct,
					  FechaInicioIrl), 0) AS dif_val_CCF,
		 ISNULL(val_SENA - LEAD(val_SENA) OVER(PARTITION BY NumIde_Em,
												  FechaIngreso,
												  FechaInicioVSP,
												  FechaInicioSLN,
												  FechafinSLN,
												  FechaInicioIEG,
												  FechafinIEG,
												  FechaInicioLMA,
												  FechafinLMA,
												  FechaInicioVac,
												  FechafinVac,
												  FechaInicioVct,
												  FechafinVct,
												  FechaInicioIrl
			   ORDER BY Num_Rad,
					  NumIde_Em,
					  FechaIngreso,
					  FechaRetiro,
					  FechaInicioVSP,
					  FechaInicioSLN,
					  FechafinSLN,
					  FechaInicioIEG,
					  FechafinIEG,
					  FechaInicioLMA,
					  FechafinLMA,
					  FechaInicioVac,
					  FechafinVac,
					  FechaInicioVct,
					  FechafinVct,
					  FechaInicioIrl), 0) AS dif_val_SENA,
		 ISNULL(val_ICBF - LEAD(val_ICBF) OVER(PARTITION BY NumIde_Em,
												  FechaIngreso,
												  FechaInicioVSP,
												  FechaInicioSLN,
												  FechafinSLN,
												  FechaInicioIEG,
												  FechafinIEG,
												  FechaInicioLMA,
												  FechafinLMA,
												  FechaInicioVac,
												  FechafinVac,
												  FechaInicioVct,
												  FechafinVct,
												  FechaInicioIrl
			   ORDER BY Num_Rad,
					  NumIde_Em,
					  FechaIngreso,
					  FechaRetiro,
					  FechaInicioVSP,
					  FechaInicioSLN,
					  FechafinSLN,
					  FechaInicioIEG,
					  FechafinIEG,
					  FechaInicioLMA,
					  FechafinLMA,
					  FechaInicioVac,
					  FechafinVac,
					  FechaInicioVct,
					  FechafinVct,
					  FechaInicioIrl), 0) AS dif_val_ICBF,
		 ISNULL(cot_pen - LEAD(cot_pen) OVER(PARTITION BY NumIde_Em,
												FechaIngreso,
												FechaInicioVSP,
												FechaInicioSLN,
												FechafinSLN,
												FechaInicioIEG,
												FechafinIEG,
												FechaInicioLMA,
												FechafinLMA,
												FechaInicioVac,
												FechafinVac,
												FechaInicioVct,
												FechafinVct,
												FechaInicioIrl
			   ORDER BY Num_Rad,
					  NumIde_Em,
					  FechaIngreso,
					  FechaRetiro,
					  FechaInicioVSP,
					  FechaInicioSLN,
					  FechafinSLN,
					  FechaInicioIEG,
					  FechafinIEG,
					  FechaInicioLMA,
					  FechafinLMA,
					  FechaInicioVac,
					  FechafinVac,
					  FechaInicioVct,
					  FechafinVct,
					  FechaInicioIrl), 0) AS dif_cot_pen,
		 ISNULL(cot_sal - LEAD(cot_sal) OVER(PARTITION BY NumIde_Em,
												FechaIngreso,
												FechaInicioVSP,
												FechaInicioSLN,
												FechafinSLN,
												FechaInicioIEG,
												FechafinIEG,
												FechaInicioLMA,
												FechafinLMA,
												FechaInicioVac,
												FechafinVac,
												FechaInicioVct,
												FechafinVct,
												FechaInicioIrl
			   ORDER BY Num_Rad,
					  NumIde_Em,
					  FechaIngreso,
					  FechaRetiro,
					  FechaInicioVSP,
					  FechaInicioSLN,
					  FechafinSLN,
					  FechaInicioIEG,
					  FechafinIEG,
					  FechaInicioLMA,
					  FechafinLMA,
					  FechaInicioVac,
					  FechafinVac,
					  FechaInicioVct,
					  FechafinVct,
					  FechaInicioIrl), 0) AS dif_cot_sal,
		 ISNULL(cot_rie - LEAD(cot_rie) OVER(PARTITION BY NumIde_Em,
												FechaIngreso,
												FechaInicioVSP,
												FechaInicioSLN,
												FechafinSLN,
												FechaInicioIEG,
												FechafinIEG,
												FechaInicioLMA,
												FechafinLMA,
												FechaInicioVac,
												FechafinVac,
												FechaInicioVct,
												FechafinVct,
												FechaInicioIrl
			   ORDER BY Num_Rad,
					  NumIde_Em,
					  FechaIngreso,
					  FechaRetiro,
					  FechaInicioVSP,
					  FechaInicioSLN,
					  FechafinSLN,
					  FechaInicioIEG,
					  FechafinIEG,
					  FechaInicioLMA,
					  FechafinLMA,
					  FechaInicioVac,
					  FechafinVac,
					  FechaInicioVct,
					  FechafinVct,
					  FechaInicioIrl), 0) AS dif_cot_rie,
		 ISNULL(vve_pen - LEAD(vve_pen) OVER(PARTITION BY NumIde_Em,
												FechaIngreso,
												FechaInicioVSP,
												FechaInicioSLN,
												FechafinSLN,
												FechaInicioIEG,
												FechafinIEG,
												FechaInicioLMA,
												FechafinLMA,
												FechaInicioVac,
												FechafinVac,
												FechaInicioVct,
												FechafinVct,
												FechaInicioIrl
			   ORDER BY Num_Rad,
					  NumIde_Em,
					  FechaIngreso,
					  FechaRetiro,
					  FechaInicioVSP,
					  FechaInicioSLN,
					  FechafinSLN,
					  FechaInicioIEG,
					  FechafinIEG,
					  FechaInicioLMA,
					  FechafinLMA,
					  FechaInicioVac,
					  FechafinVac,
					  FechaInicioVct,
					  FechafinVct,
					  FechaInicioIrl), 0) AS dif_vve_pen
    INTO #Emp
    FROM #t_Rhh_PlaUnicaCrr;

    WITH Empleados
	    AS (SELECT ROW_NUMBER() OVER(PARTITION BY NumIde_Em
				ORDER BY NumIde_Em) AS Nro,
				NumIde_Em
		   FROM #Emp
		   WHERE dif_ibc_pen > 0
			    OR dif_ibc_sal > 0
			    OR dif_ibc_rie > 0
			    OR dif_vae_fsp_solid > 0
			    OR dif_vae_fsp_subsist > 0
			    OR dif_val_CCF > 0
			    OR dif_val_SENA > 0
			    OR dif_val_ICBF > 0
			    OR dif_cot_pen > 0
			    OR dif_cot_sal > 0
			    OR dif_cot_rie > 0
			    OR dif_vve_pen > 0)

	    DELETE #Emp
	    WHERE numIde_em NOT IN( SELECT NumIde_Em
						   FROM Empleados );

    DELETE #t_Rhh_PlaUnicaCrr
    WHERE NumIde_Em NOT IN( SELECT NumIde_Em FROM #Emp );

    WITH Empleados
	    AS (SELECT ROW_NUMBER() OVER(PARTITION BY NumIde_Em
				ORDER BY NumIde_Em) AS Nro,
				NumIde_Em,
				Secuen
		   FROM #Emp)
	    INSERT INTO #t_Rhh_datosFaltantes
	    SELECT PR.cod_cia AS COD_CIA,
			 PR.ano AS ANO,
			 PR.per AS PER,
			 @Num_Rad AS Num_rad,
			 PR.Secuen AS Secuencia,
			 PR.NumIde_Em,
			 'N' AS Tip_Planilla,
			 PR.ibc_pen,
			 PR.ibc_sal,
			 PR.ibc_rie,
			 PR.vae_fsp_solid,
			 PR.vae_fsp_subsist,
			 PR.val_CCF,
			 PR.val_SENA,
			 PR.val_ICBF,
			 PR.cot_pen,
			 PR.cot_sal,
			 PR.cot_rie,
			 PR.Cot_Exo,
			 PR.vve_pen,
			 PR.nov_sln,
			 PR.nov_ing,
			 PR.nov_ret,
			 PR.dia_pen,
			 PR.dia_sal,
			 PR.dia_rie,
			 PR.dia_ccf,
			 PR.sal_bas,
			 PR.base_ccf,
			 PR.FechaIngreso,
			 PR.FechaRetiro,
			 PR.FechaInicioVSP,
			 PR.FechaInicioSLN,
			 PR.FechafinSLN,
			 PR.FechaInicioIEG,
			 PR.FechafinIEG,
			 PR.FechaInicioLMA,
			 PR.FechafinLMA,
			 PR.FechaInicioVac,
			 PR.FechafinVac,
			 PR.FechaInicioVct,
			 PR.FechafinVct,
			 PR.FechaInicioIrl,
			 PR.FechafinIrl
	    FROM Empleados AS E
	    INNER JOIN Rhh_PlaUnica_Reg02 AS PR ON E.NumIde_Em = PR.NumIde_Em
									   AND PR.ano = @Ano
									   AND PR.per = @Per
									   AND PR.Num_Rad = @Num_Pl_Aso
									   AND E.Nro = 1
	    LEFT JOIN #t_Rhh_PlaUnicaCrr AS C ON C.NumIde_Em = PR.NumIde_Em
									 AND PR.FechaIngreso = c.FechaIngreso
									 AND PR.FechaRetiro = C.FechaRetiro
									 AND PR.FechaInicioVSP = C.FechaInicioVSP
									 AND PR.FechaInicioSLN = C.FechaInicioSLN
									 AND PR.FechaInicioIEG = C.FechaInicioIEG
									 AND PR.FechaInicioLMA = C.FechaInicioLMA
									 AND PR.FechaInicioVac = C.FechaInicioVac
									 AND PR.FechaInicioVct = C.FechaInicioVct
									 AND PR.FechaInicioIrl = C.FechaInicioIrl
	    WHERE C.NumIde_Em IS NULL;

    INSERT INTO #t_Rhh_PlaUnicaCrr
    SELECT DF.cod_cia AS COD_CIA,
		 DF.ano AS ANO,
		 DF.per AS PER,
		 @Num_Rad AS Num_rad,
		 DF.Secuen AS Secuencia,
		 DF.NumIde_Em,
		 'N' AS Tip_Planilla,
		 DF.ibc_pen,
		 DF.ibc_sal,
		 DF.ibc_rie,
		 DF.vae_fsp_solid,
		 DF.vae_fsp_subsist,
		 DF.val_CCF,
		 DF.val_SENA,
		 DF.val_ICBF,
		 DF.cot_pen,
		 DF.cot_sal,
		 DF.cot_rie,
		 DF.Cot_Exo,
		 DF.vve_pen,
		 DF.nov_sln,
		 DF.nov_ing,
		 DF.nov_ret,
		 DF.dia_pen,
		 DF.dia_sal,
		 DF.dia_rie,
		 DF.dia_ccf,
		 DF.sal_bas,
		 DF.base_ccf,
		 DF.FechaIngreso,
		 DF.FechaRetiro,
		 DF.FechaInicioVSP,
		 DF.FechaInicioSLN,
		 DF.FechafinSLN,
		 DF.FechaInicioIEG,
		 DF.FechafinIEG,
		 DF.FechaInicioLMA,
		 DF.FechafinLMA,
		 DF.FechaInicioVac,
		 DF.FechafinVac,
		 DF.FechaInicioVct,
		 DF.FechafinVct,
		 DF.FechaInicioIrl,
		 DF.FechafinIrl
    FROM #t_Rhh_datosFaltantes AS DF;

    INSERT INTO #t_Rhh_PlaUnicaCrr
    SELECT DF.cod_cia AS COD_CIA,
		 DF.ano AS ANO,
		 DF.per AS PER,
		 @Num_Pl_Aso AS Num_rad,
		 DF.Secuen AS Secuencia,
		 DF.NumIde_Em,
		 'E' AS Tip_Planilla,
		 DF.ibc_pen,
		 DF.ibc_sal,
		 DF.ibc_rie,
		 DF.vae_fsp_solid,
		 DF.vae_fsp_subsist,
		 DF.val_CCF,
		 DF.val_SENA,
		 DF.val_ICBF,
		 DF.cot_pen,
		 DF.cot_sal,
		 DF.cot_rie,
		 DF.Cot_Exo,
		 DF.vve_pen,
		 DF.nov_sln,
		 DF.nov_ing,
		 DF.nov_ret,
		 DF.dia_pen,
		 DF.dia_sal,
		 DF.dia_rie,
		 DF.dia_ccf,
		 DF.sal_bas,
		 DF.base_ccf,
		 DF.FechaIngreso,
		 DF.FechaRetiro,
		 DF.FechaInicioVSP,
		 DF.FechaInicioSLN,
		 DF.FechafinSLN,
		 DF.FechaInicioIEG,
		 DF.FechafinIEG,
		 DF.FechaInicioLMA,
		 DF.FechafinLMA,
		 DF.FechaInicioVac,
		 DF.FechafinVac,
		 DF.FechaInicioVct,
		 DF.FechafinVct,
		 DF.FechaInicioIrl,
		 DF.FechafinIrl
    FROM #t_Rhh_datosFaltantes AS DF;

    IF EXISTS( SELECT *
			FROM #t_Rhh_PlaUnicaCrr
			WHERE Tip_Planilla NOT IN( 'E' ) )
    BEGIN
	   BEGIN TRY

		  INSERT INTO Rhh_PlaUnica_Reg02( Cod_cia,
								    Cod_Suc,
								    Ano,
								    Per,
								    Num_Rad,
								    Tip_Planilla,
								    Tip_reg,
								    Secuen,
								    TipIde_Emp,
								    NumIde_Em,
								    Tipo_Cotizante,
								    SubTip_Cotiza,
								    Ind_Extran,
								    IndColmbExterio,
								    Dpto_Labora,
								    Muni_Labora,
								    ap1_emp,
								    ap2_emp,
								    nom1_emp,
								    nom2_emp,
								    nov_ing,
								    nov_ret,
								    nov_tdas,
								    nov_taas,
								    nov_tdap,
								    nov_taap,
								    nov_vsp,
								    Correccion,
								    nov_vst,
								    nov_sln,
								    nov_ige,
								    nov_lma,
								    nov_vac,
								    nov_avp,
								    nov_vct,
								    dia_irp,
								    fdo_pen_Act,
								    fdo_pen_dest,
								    fdo_sal_act,
								    fdo_sal_dest,
								    fdo_caja,
								    dia_pen,
								    dia_sal,
								    dia_rie,
								    dia_CCF,
								    sal_bas,
								    ind_salIntegral,
								    ibc_pen,
								    ibc_sal,
								    ibc_rie,
								    Base_CCF,
								    por_pen,
								    cot_pen,
								    vve_pen,
								    vvp_pen,
								    tot_cot_pen,
								    vae_fsp_solid,
								    vae_fsp_subsist,
								    nrt_avp,
								    por_sal,
								    cot_sal,
								    upc_emp,
								    nro_ieg,
								    val_ieg,
								    nro_ilm,
								    val_ilm,
								    por_rie,
								    Cent_Trab,
								    cot_rie,
								    tar_CCF,
								    val_CCF,
								    tar_SENA,
								    val_SENA,
								    tar_icbf,
								    val_ICBF,
								    tar_eit,
								    Val_EIT,
								    tar_esap,
								    Val_ESAP,
								    TipIde_Cot,
								    NumIde_Cot,
								    Cot_Exo,
								    FechaIngreso,
								    FechaRetiro,
								    FechaInicioVSP,
								    FechaInicioSLN,
								    FechafinSLN,
								    FechaInicioIEG,
								    FechafinIEG,
								    FechaInicioLMA,
								    FechafinLMA,
								    FechaInicioVac,
								    FechafinVac,
								    FechaInicioVct,
								    FechafinVct,
								    FechaInicioIrl,
								    FechafinIrl,
								    IBCOtParaf,
								    HorasLab,
								    Admon_Rie,
								    ClaseRiesgo,
								    TarEspPen,
								    FecExt,
								    ciiu
								  )
		  SELECT R.Cod_cia,
			    Cod_Suc,
			    R.Ano,
			    R.Per,
			    @Num_Rad,
			    'N',
			    R.Tip_reg,
			    R.Secuen,
			    TipIde_Emp,
			    R.NumIde_Em,
			    Tipo_Cotizante,
			    SubTip_Cotiza,
			    Ind_Extran,
			    IndColmbExterio,
			    Dpto_Labora,
			    Muni_Labora,
			    ap1_emp,
			    ap2_emp,
			    nom1_emp,
			    nom2_emp,
			    R.nov_ing,
			    R.nov_ret,
			    nov_tdas,
			    nov_taas,
			    nov_tdap,
			    nov_taap,
			    nov_vsp,
			    'A',
			    nov_vst,
			    R.nov_sln,
			    nov_ige,
			    nov_lma,
			    nov_vac,
			    nov_avp,
			    nov_vct,
			    dia_irp,
			    fdo_pen_Act,
			    fdo_pen_dest,
			    fdo_sal_act,
			    fdo_sal_dest,
			    fdo_caja,
			    R.dia_pen,
			    R.dia_sal,
			    R.dia_rie,
			    R.dia_CCF,
			    R.sal_bas,
			    ind_salIntegral,
			    R.ibc_pen,
			    R.ibc_sal,
			    R.ibc_rie,
			    R.Base_CCF,
			    por_pen,
			    R.cot_pen,
			    R.vve_pen,
			    vvp_pen,
			    tot_cot_pen,
			    R.vae_fsp_solid,
			    R.vae_fsp_subsist,
			    nrt_avp,
			    por_sal,
			    R.cot_sal,
			    upc_emp,
			    nro_ieg,
			    val_ieg,
			    nro_ilm,
			    val_ilm,
			    por_rie,
			    Cent_Trab,
			    R.cot_rie,
			    tar_CCF,
			    R.val_CCF,
			    tar_SENA,
			    R.val_SENA,
			    tar_icbf,
			    R.val_ICBF,
			    tar_eit,
			    Val_EIT,
			    tar_esap,
			    Val_ESAP,
			    r.TipIde_Cot,
			    r.NumIde_Cot,
			    R.Cot_Exo,
			    R.FechaIngreso,
			    R.FechaRetiro,
			    R.FechaInicioVSP,
			    R.FechaInicioSLN,
			    R.FechafinSLN,
			    R.FechaInicioIEG,
			    R.FechafinIEG,
			    R.FechaInicioLMA,
			    R.FechafinLMA,
			    R.FechaInicioVac,
			    R.FechafinVac,
			    R.FechaInicioVct,
			    R.FechafinVct,
			    R.FechaInicioIrl,
			    R.FechafinIrl,
			    R.IBCOtParaf,
			    R.HorasLab,
			    R.Admon_Rie,
			    R.ClaseRiesgo,
			    R.TarEspPen,
			    R.FecExt,
			    R.ciiu
		  FROM #t_Rhh_PlaUnicaCrr AS C
		  INNER JOIN Rhh_PlaUnica_Reg02 AS R ON R.Num_Rad = C.Num_Rad
										AND R.NumIde_Em = C.NumIde_Em
										AND R.ano = C.ano
										AND R.per = C.per
										AND R.FechaInicioSLN = C.FechaInicioSLN
										AND R.FechaInicioIEG = C.FechaInicioIeg
										AND R.FechaInicioLMA = c.FechaInicioLMA
										AND R.FechaInicioVac = C.FechaInicioVac
										AND R.FechaInicioIrl = C.FechaInicioIrl
										AND R.FechaIngreso = C.FechaIngreso
										AND R.FechaRetiro = c.FechaRetiro
		  WHERE R.Tip_Planilla = 'E';

		  UPDATE Rhh_PlaUnica_Reg02
		    SET Correccion = 'C'
		  FROM #t_Rhh_PlaUnicaCrr C
		  INNER JOIN Rhh_PlaUnica_Reg02 R ON R.Num_Rad = C.Num_Rad
									  AND R.NumIde_Em = C.NumIde_Em
									  AND R.ano = C.ano
									  AND R.per = C.per
									  AND R.FechaIngreso = C.FechaIngreso
									  AND R.FechaRetiro = C.FechaRetiro
									  AND R.FechaInicioSLN = C.FechaInicioSLN
									  AND R.FechaInicioIEG = C.FechaInicioIeg
									  AND R.FechaInicioLMA = c.FechaInicioLMA
									  AND R.FechaInicioVac = C.FechaInicioVac
									  AND R.FechaInicioIrl = C.FechaInicioIrl
		  WHERE R.Tip_Planilla = 'N' AND Correccion = '';

		  DELETE Rhh_PlaUnica_Reg02
		  WHERE Tip_Planilla = 'N'
			   AND Num_Rad LIKE '<%'
			   AND (Correccion IS NULL OR Correccion = ''
				  )
			   AND per = @Per
			   AND ano = @ano;

		  WITH Num_Emp
			  AS (SELECT NumIde_Em
				 FROM Rhh_PlaUnica_Reg02 AS R
				 WHERE R.Tip_Planilla = 'N'
					  AND R.ano = @Ano
					  AND R.per = @Per
					  AND R.Num_Rad = @Num_Rad
					  AND Correccion = 'C'
				 GROUP BY R.NumIde_Em)
			  SELECT @Num_Emp = COUNT(NumIde_Em)
			  FROM Num_emp;

		  UPDATE Rhh_PlaUnica_Reg01
		    SET Num_Emp = @Num_Emp
		  WHERE Tip_Planilla = 'N' AND Ano = @Ano AND Per = @Per AND Num_Rad = @Num_Rad;

		  SELECT NumIde_Em,
			    CORRECCION,
			    Num_rad,
			    tip_planilla,
			    ano,
			    per,
			    secuen,
			    DENSE_RANK() OVER(
			    ORDER BY NumIde_Em,
					   FechaIngreso,
					   FechaRetiro,
					   FechaInicioVSP,
					   FechaInicioSLN,
					   FechafinSLN,
					   FechaInicioIEG,
					   FechafinIEG,
					   FechaInicioLMA,
					   FechafinLMA,
					   FechaInicioVac,
					   FechafinVac,
					   FechaInicioVct,
					   FechafinVct,
					   FechaInicioIrl,
					   Correccion) AS SECUENCIA
		  INTO #TEMPO
		  FROM Rhh_PlaUnica_Reg02
		  WHERE Tip_Planilla = 'N' AND Ano = @Ano AND Per = @Per AND Num_Rad = @Num_Rad
		  ORDER BY NumIde_Em,
				 Correccion;

		  UPDATE Rhh_PlaUnica_Reg02
		    SET Secuen = T.secuencia
		  FROM Rhh_PlaUnica_Reg02 R
		  INNER JOIN #TEMPO T ON R.NumIde_Em = T.NumIde_Em
							AND R.PER = T.Per
							AND T.ano = R.Ano
							AND T.Num_Rad = R.Num_Rad
							AND T.Secuen = R.Secuen
							AND T.Correccion = R.Correccion;

		  SELECT @Val_nom = SUM(R02.Base_CCF * CASE Correccion
										   WHEN 'A' THEN-1
										   WHEN 'C' THEN 1
									    END)
		  FROM Rhh_PlaUnica_Reg02 AS R02
		  INNER JOIN Rhh_PlaUnica_Reg01 AS R01 ON R01.Ano = R02.ano AND R01.Per = R02.per AND R01.Num_Rad = R02.Num_Rad
		  WHERE R01.Ano = @Ano AND R01.Per = @Per AND R01.Num_Rad = @Num_Rad;

		  UPDATE Rhh_PlaUnica_Reg01
		    SET Val_Nom = @Val_nom
		  WHERE Ano = @Ano AND Per = @Per AND Num_Rad = @Num_Rad;

		  IF @nErrores = 0
		  BEGIN

			 INSERT INTO #t_ErrorPLC( cod_error,
								 error,
								 ANO,
								 PER,
								 NumTemp,
								 Codigo
							    )
			 VALUES
				   (
				   @nErrores, 'Planilla de Corrección generada satisfactoriamente', @Ano, @Per, @Num_Pl_Aso, 0 );
		  END;

		  SELECT * FROM #t_ErrorPLC;

		  SELECT Tip_Reg,
			    Modal_plani,
			    secuen,
			    Razon_Soc,
			    TipIde_Apo,
			    NumIde_Apo,
			    DigVer_Apo,
			    Tip_planilla,
			    Num_Planill_Aso,
			    Fch_Planill_Aso,
			    FormaPresent,
			    Cod_Suc,
			    Nom_Suc,
			    Cod_ARP,
			    Per_PRC,
			    Per_SAL,
			    0 AS Num_Rad,
			    Fch_Pag,
			    Num_Emp,
			    Val_Nom,
			    Tip_Apor,
			    Cod_Ope
		  FROM Rhh_PlaUnica_Reg01
		  WHERE Tip_Planilla = 'N' AND Ano = @Ano AND Per = @Per AND Num_Rad = @Num_Rad;

		  SELECT Tip_reg,
			    Secuen,
			    TipIde_Emp,
			    NumIde_Em,
			    CASE @cDec376
				   WHEN 0 THEN Tipo_Cotizante
				   ELSE '14'
			    END AS Tipo_Cotizante,
			    SubTip_Cotiza,
			    Ind_Extran,
			    IndColmbExterio,
			    Dpto_Labora,
			    Muni_Labora,
			    ap1_emp,
			    ap2_emp,
			    nom1_emp,
			    nom2_emp,
			    nov_ing,
			    nov_ret,
			    nov_tdas,
			    nov_taas,
			    nov_tdap,
			    nov_taap,
			    nov_vsp,
			    Correccion,
			    nov_vst,
			    nov_sln,
			    nov_ige,
			    nov_lma,
			    nov_vac,
			    nov_avp,
			    nov_vct,
			    dia_irp,
			    fdo_pen_Act,
			    fdo_pen_dest,
			    fdo_sal_act,
			    fdo_sal_dest,
			    fdo_caja,
			    dia_pen,
			    dia_sal,
			    dia_rie,
			    dia_CCF,
			    sal_bas,
			    ind_salIntegral,
			    ibc_pen,
			    ibc_sal,
			    ibc_rie,
			    Base_CCF,
			    por_pen,
			    cot_pen,
			    vve_pen,
			    vvp_pen,
			    tot_cot_pen,
			    vae_fsp_solid,
			    vae_fsp_subsist,
			    nrt_avp,
			    por_sal,
			    cot_sal,
			    upc_emp,
			    nro_ieg,
			    val_ieg,
			    nro_ilm,
			    val_ilm,
			    por_rie,
			    Cent_Trab,
			    cot_rie,
			    tar_CCF,
			    val_CCF,
			    tar_SENA,
			    val_SENA,
			    tar_icbf,
			    val_ICBF,
			    tar_eit,
			    Val_EIT,
			    tar_esap,
			    Val_ESAP,
			    TipIde_Cot,
			    NumIde_Cot,
			    Cot_Exo,
			    Admon_Rie,
			    ClaseRiesgo,
			    TarEspPen,
			    CASE FechaIngreso
				   WHEN '19000101' THEN CONVERT(VARCHAR(10), '', 121)
				   ELSE CONVERT(CHAR(10), FechaIngreso, 120)
			    END AS FechaIngreso,
			    CASE FechaRetiro
				   WHEN '19000101' THEN CONVERT(VARCHAR(10), '', 121)
				   ELSE CONVERT(CHAR(10), FechaRetiro, 120)
			    END AS FechaRetiro,
			    CASE FechaInicioVSP
				   WHEN '19000101' THEN CONVERT(VARCHAR(10), '', 121)
				   ELSE CONVERT(CHAR(10), FechaInicioVSP, 120)
			    END AS FechaInicioVSP,
			    CASE FechaInicioSLN
				   WHEN '19000101' THEN CONVERT(VARCHAR(10), '', 121)
				   ELSE CONVERT(CHAR(10), FechaInicioSLN, 120)
			    END AS FechaInicioSLN,
			    CASE FechafinSLN
				   WHEN '19000101' THEN CONVERT(VARCHAR(10), '', 121)
				   ELSE CONVERT(CHAR(10), FechafinSLN, 120)
			    END AS FechafinSLN,
			    CASE FechaInicioIEG
				   WHEN '19000101' THEN CONVERT(VARCHAR(10), '', 121)
				   ELSE CONVERT(CHAR(10), FechaInicioIEG, 120)
			    END AS FechaInicioIEG,
			    CASE FechafinIEG
				   WHEN '19000101' THEN CONVERT(VARCHAR(10), '', 121)
				   ELSE CONVERT(CHAR(10), FechafinIEG, 120)
			    END AS FechafinIEG,
			    CASE FechaInicioLMA
				   WHEN '19000101' THEN CONVERT(VARCHAR(10), '', 121)
				   ELSE CONVERT(CHAR(10), FechaInicioLMA, 120)
			    END AS FechaInicioLMA,
			    CASE FechafinLMA
				   WHEN '19000101' THEN CONVERT(VARCHAR(10), '', 121)
				   ELSE CONVERT(CHAR(10), FechafinLMA, 120)
			    END AS FechafinLMA,
			    CASE FechaInicioVac
				   WHEN '19000101' THEN CONVERT(VARCHAR(10), '', 121)
				   ELSE CONVERT(CHAR(10), FechaInicioVac, 120)
			    END AS FechaInicioVac,
			    CASE FechafinVac
				   WHEN '19000101' THEN CONVERT(VARCHAR(10), '', 121)
				   ELSE CONVERT(CHAR(10), FechafinVac, 120)
			    END AS FechafinVac,
			    CASE FechaInicioVct
				   WHEN '19000101' THEN CONVERT(VARCHAR(10), '', 121)
				   ELSE CONVERT(CHAR(10), FechaInicioVct, 120)
			    END AS FechaInicioVct,
			    CASE FechafinVct
				   WHEN '19000101' THEN CONVERT(VARCHAR(10), '', 121)
				   ELSE CONVERT(CHAR(10), FechafinVct, 120)
			    END AS FechafinVct,
			    CASE FechaInicioIrl
				   WHEN '19000101' THEN CONVERT(VARCHAR(10), '', 121)
				   ELSE CONVERT(CHAR(10), FechaInicioIrl, 120)
			    END AS FechaInicioIrl,
			    CASE FechafinIrl
				   WHEN '19000101' THEN CONVERT(VARCHAR(10), '', 121)
				   ELSE CONVERT(CHAR(10), FechafinIrl, 120)
			    END AS FechafinIrl,
			    CONVERT(BIGINT, IBCOtParaf) AS IBCOtParaf,
			    CONVERT(BIGINT, HorasLab) AS HorasLab,
			    CASE FecExt
				   WHEN '19000101' THEN CONVERT(VARCHAR(10), '', 121)
				   ELSE CONVERT(CHAR(10), FecExt, 120)
			    END AS FecExt,
			    ciiu
		  FROM Rhh_PlaUnica_Reg02
		  WHERE Tip_Planilla = 'N' AND Ano = @Ano AND Per = @Per AND Num_Rad = @Num_Rad
		  ORDER BY NumIde_Em,
				 Secuen,
				 Correccion;
	   END TRY
	   BEGIN CATCH

		  EXEC sp_rhh_LiqErrInfo @cMsgErr OUTPUT;
		  SELECT @nErrores = @nErrores + 1;

		  INSERT INTO #t_ErrorPLC( cod_error,
							  error,
							  ANO,
							  PER,
							  NumTemp,
							  Codigo
							)
		  VALUES
			    (
			    @nErrores, 'Error en la Creación del Registro de Corrección' + @cMsgErr, @Ano, @Per, @Num_Pl_Aso, 0 );

		  SELECT * FROM #t_ErrorPLC;
	   END CATCH;

    END;
	   ELSE
    BEGIN

	   DELETE Rhh_PlaUnica_Reg02
	   WHERE Tip_Planilla = 'N'
		    AND Num_Rad LIKE '<%'
		    AND (Correccion IS NULL OR Correccion = ''
			   )
		    AND PER = @Per
		    AND Ano = @ANO;

	   DELETE Rhh_PlaUnica_Reg01
	   WHERE Tip_planilla IN( 'C', 'N' ) AND Num_Rad LIKE '<%' AND PER = @Per AND Ano = @ANO;

	   SELECT @nErrores = @nErrores + 1;

	   INSERT INTO #t_ErrorPLC( cod_error,
						   error,
						   ANO,
						   PER,
						   NumTemp,
						   Codigo
						 )
	   VALUES
			(
			@nErrores, 'No se encuentran registros para Corregir', @Ano, @Per, @Num_Pl_Aso, '0' );

	   SELECT * FROM #t_ErrorPLC;

	   SELECT Tip_Reg,
			Modal_plani,
			secuen,
			Razon_Soc,
			TipIde_Apo,
			NumIde_Apo,
			DigVer_Apo,
			Tip_planilla,
			Num_Planill_Aso,
			Fch_Planill_Aso,
			FormaPresent,
			Cod_Suc,
			Nom_Suc,
			Cod_ARP,
			Per_PRC,
			Per_SAL,
			Num_Rad,
			Fch_Pag,
			Num_Emp,
			Val_Nom,
			Tip_Apor,
			Cod_Ope
	   FROM Rhh_PlaUnica_Reg01
	   WHERE Tip_Planilla = 'N' AND Ano = @Ano AND Per = @Per AND Num_Rad = @Num_Rad;

	   SELECT Tip_reg,
			Secuen,
			TipIde_Emp,
			NumIde_Em,
			CASE @cDec376
			    WHEN 0 THEN Tipo_Cotizante
			    ELSE '14'
			END AS Tipo_Cotizante,
			SubTip_Cotiza,
			Ind_Extran,
			IndColmbExterio,
			Dpto_Labora,
			Muni_Labora,
			ap1_emp,
			ap2_emp,
			nom1_emp,
			nom2_emp,
			nov_ing,
			nov_ret,
			nov_tdas,
			nov_taas,
			nov_tdap,
			nov_taap,
			nov_vsp,
			Correccion,
			nov_vst,
			nov_sln,
			nov_ige,
			nov_lma,
			nov_vac,
			nov_avp,
			nov_vct,
			dia_irp,
			fdo_pen_Act,
			fdo_pen_dest,
			fdo_sal_act,
			fdo_sal_dest,
			fdo_caja,
			dia_pen,
			dia_sal,
			dia_rie,
			dia_CCF,
			sal_bas,
			ind_salIntegral,
			ibc_pen,
			ibc_sal,
			ibc_rie,
			Base_CCF,
			por_pen,
			cot_pen,
			vve_pen,
			vvp_pen,
			tot_cot_pen,
			vae_fsp_solid,
			vae_fsp_subsist,
			nrt_avp,
			por_sal,
			cot_sal,
			upc_emp,
			nro_ieg,
			val_ieg,
			nro_ilm,
			val_ilm,
			por_rie,
			Cent_Trab,
			cot_rie,
			tar_CCF,
			val_CCF,
			tar_SENA,
			val_SENA,
			tar_icbf,
			val_ICBF,
			tar_eit,
			Val_EIT,
			tar_esap,
			Val_ESAP,
			TipIde_Cot,
			NumIde_Cot,
			Cot_Exo,
			FechaIngreso,
			FechaRetiro,
			FechaInicioVSP,
			FechaInicioSLN,
			FechafinSLN,
			FechaInicioIEG,
			FechafinIEG,
			FechaInicioLMA,
			FechafinLMA,
			FechaInicioVac,
			FechafinVac,
			FechaInicioVct,
			FechafinVct,
			FechaInicioIrl,
			FechafinIrl,
			IBCOtParaf,
			HorasLab,
			Admon_Rie,
			ClaseRiesgo,
			TarEspPen,
			FecExt
	   FROM Rhh_PlaUnica_Reg02
	   WHERE Tip_Planilla = 'N' AND Ano = @Ano AND Per = @Per AND Num_Rad = @Num_Rad
	   ORDER BY NumIde_Em,
			  Correccion;

    END;

	   -- IF @nErrores = 0
	   -- BEGIN
	   -- INSERT INTO #t_ErrorPLC( cod_error,
	   --			   error,
	   --			   ANO,
	   --			   PER,
	   --			   NumTemp
	   --			 )
	   -- VALUES
	   --(
	   --@nErrores, 'Planilla de Corrección generada satisfactoriamente', @Ano, @Per, @Num_Pl_Aso );
	   --   SELECT '4',* FROM #t_ErrorPLC;
	   -- END;
END;

```
