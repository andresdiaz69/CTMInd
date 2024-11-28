# Stored Procedure: sp_rhh_PlaunicaExcel

## Usa los objetos:
- [[Rhh_PlaUnica_Reg01]]
- [[Rhh_PlaUnica_Reg02]]

```sql
--=====================================================================
--ING VITOR OLEJO 
-- 08/02/2020 -SNR2020 - 0162. REPORTE pLNILLA UNICA EXPORTAR A EXCEL. 
-- exec sp_rhh_PlaunicaExcel '2022','11','%','E','%'
	
--======================================================================

CREATE PROCEDURE [dbo].[sp_rhh_PlaunicaExcel]
	@AnoDoc CHAR(4),
	@PerDoc CHAR(2),
	@CodCia CHAR(3),	
	@TipPlanilla VARCHAR(1),
	@NumRadicado VARCHAR(10)
--WITH ENCRYPTION
AS
BEGIN
    SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
    SET ROWCOUNT 0;
    SET NOCOUNT ON;

   SELECT R01.Cod_cia As  Compania, 
		R01.Cod_suc As Sucursal,	
		R01.Ano As Anio,	
		R01.Per As Periodo,	
		R01.Tip_planilla AS Tip_planilla, 
		R01.Tip_Reg As TipRegistro_Encab,
		Modal_plani As Modal_plani,	
		R01.Secuen As SecuenciaEncab,	
		Razon_Soc As Razon_Social,	
		TipIde_Apo As Tipo_Id_Aportante,	
		NumIde_Apo As Id_Aportante,	
		DigVer_Apo As DigitoVerificacion,	
		Num_Planill_Aso As Planilla_Asociada,	
		Fch_Planill_Aso As Fecha_Planilla_Asoc,	
		FormaPresent As Forma_presentacion,	
		Nom_Suc As Nombre_Sucursal,	
		Cod_ARP As Codigo_ARL,	
		Per_PRC  AS Periodo_PRC,	
		Per_SAL As Periodo_SAL,	
		R01.Num_Rad As Num_Radicado,	
		Fch_Pag As Fecha_Pago,	
		Num_Emp As Num_empleados,	
		Val_Nom As Valor_Nomina,	
		Tip_Apor As Tipo_Aportante,	
		Cod_Ope As Cod_Ope,	
		--doc_anx ,
		--nom_anx,	
		--usuario,
	     R02.Tip_Reg As TipRegistro_Cuerpo,	
		R02.Secuen As Secuencia_Cuerpo,	
		TipIde_Emp As Tipo_Id_Empleado,	
		NumIde_Em As Id_Empleado,	
		Tipo_Cotizante AS Tipo_Cotizante,	
		SubTip_Cotiza AS Subtipo_Cotizante,	
		Ind_Extran As  Extranjero,	
		IndColmbExterio As ColombianoExterior,	
		Dpto_Labora As Dpto_Labora ,	
		Muni_Labora As Muni_Labora,	
		ap1_emp As Apellido_1,	
		ap2_emp As Apellido_2,	
		nom1_emp AS Nombre_1,	
		nom2_emp AS Nombre_2,
		nov_ing As Nov_Ingreso,	
		nov_ret As Nov_Retiro,	
		nov_tdas AS NovTraslSalud_Desde,	
		nov_taas AS NovTraslSalud_otra,	
		nov_tdap As NovTraslPens_Desde,
		nov_taap As NovTraslPens_otra,	
		nov_vsp As Nov_VariaSal_Permanente,	
		Correccion As Correccion,	
		nov_vst As Nov_Transitoria,	
		nov_sln As Nov_Sln,	
		nov_ige As Nov_Ige,	
		nov_lma As Nov_LicMaternidad,	
		nov_vac As Nov_Vacaciones,	
		nov_avp As Nov_AportesVol,	
		nov_vct As Nov_vct,	
		dia_irp As Dias_IncRiesPro,	
		fdo_pen_Act As Fdopen_Actual ,	
		fdo_pen_dest As Fdopen_Destino,	
		fdo_sal_act As Fdosal_Actual,	
		fdo_sal_dest As Fdosal_Destino,	
		fdo_caja As Fdo_caja,	
		dia_pen As Dias_penension,	
		dia_sal As  Dias_Salud,	
		dia_rie As Dias_Riegos,	
		dia_CCF As Dias_CCF,	
		sal_bas As Salario_Basico,	
		ind_salIntegral As SalarioIntegral,	
		ibc_pen As IBC_Pension,	
		ibc_sal As IBC_Salud,	
		ibc_rie As IBC_Riesgos,	
		Base_CCF As Base_CCF,
		por_pen As Porjetaje_Pension,	
		cot_pen As Cotizacion_pension,	
	     vve_pen AS Valor_AportePenEmp,	
		vvp_pen As Valor_AportePenPatro,	
		tot_cot_pen As Total_CotizaPens,	
		vae_fsp_solid As Aporte_FspSolid,	
		vae_fsp_subsist As Aporte_FspSubsist,		
		nrt_avp,	
		por_sal As Porjetaje_Salud,
		cot_sal As Cotizacion_Salud,	
		upc_emp As UPC,	
		nro_ieg AS Nro_IEG,	
		val_ieg AS Valor_IEG,	
		nro_ilm AS Num_ILM,	
		val_ilm As Valor_ILM,	
		por_rie AS Porcetaje_Riegos,	
		Cent_Trab AS Centro_Trabajo,	
		cot_rie As Cotizacion_Riesgos,	
		tar_CCF As Porcentaje_CCF,	
		val_CCF As Val_CCF,	
		tar_SENA AS Prcentaje_sena,	
		val_SENA AS Valor_sena,	
		tar_icbf As Porcentaje_ICBF,	
		val_ICBF As Valor_ICBF ,	
		tar_eit As Porcentaje_EIT,	
		Val_EIT As Valor_EIT,	
		tar_esap As Porcentaje_ESAP,	
		Val_ESAP As Valor_ESAP,	
		Pen_emp  ,	
		Pen_comp,	
		Ap1_causante,	
		Ap2_causante,	
		Nom1_causante,	
		Nom2_causante,	
		Tip_Ide_Causant,	
		tip_pen AS Tipo_Pension,	
		DeptoResidencia,	
		CiudResidencia,	
		Cot_Exo,	
		TipIde_Cot,	
		NumIde_Cot,	
		CONVERT(VARCHAR,FechaIngreso,103) as FechaIngreso,	
		CONVERT(VARCHAR,FechaRetiro,103) as FechaRetiro,
		CONVERT(VARCHAR,FechaInicioVSP,103) as	FechaInicioVSP,
		CONVERT(VARCHAR,FechaInicioSLN,103) as	FechaInicioSLN,	
		CONVERT(VARCHAR,FechafinSLN,103) as FechafinSLN,	
		CONVERT(VARCHAR,FechaInicioIEG,103) as FechaInicioIEG,	
		CONVERT(VARCHAR,FechafinIEG,103) as FechafinIEG,	
		CONVERT(VARCHAR,FechaInicioLMA,103) as FechaInicioLMA,	
		CONVERT(VARCHAR,FechafinLMA,103) as FechafinLMA,	
		CONVERT(VARCHAR,FechaInicioVac,103) as FechaInicioVac,	
		CONVERT(VARCHAR,FechafinVac,103) as FechafinVac,
		CONVERT(VARCHAR,FechaInicioVct,103) as FechaInicioVct,	
		CONVERT(VARCHAR,FechafinVct,103) as FechafinVct,	
		CONVERT(VARCHAR,FechaInicioIrl,103) as FechaInicioIrl,	
		CONVERT(VARCHAR,FechafinIrl,103) as FechafinIrl,	
		IBCOtParaf,	
		HorasLab,	
		Admon_Rie,	
		ClaseRiesgo,	
		TarEspPen,	
		CONVERT(VARCHAR,FecExt,103) as FecExt,
		ciiu
from Rhh_PlaUnica_Reg01 R01
INNER JOIN Rhh_PlaUnica_Reg02 R02 ON R01. cod_cia  = R02. cod_cia and R01.ano =R02.ano and R01.per =R02.per
							and R01.Tip_planilla =R02.Tip_planilla and R01.cod_suc =R02.cod_suc 
							and R01.num_rad  = R02.num_rad 
where  R01.cod_cia LIKE RTRIM(LTRIM (@CodCia)) 
and R01.ano = @AnoDoc 
and R01.per = @PerDoc
and R01.Tip_planilla LIKE RTRIM(LTRIM (@TipPlanilla))
and R01.num_rad  LIKE RTRIM(LTRIM (@NumRadicado))

END 


```
