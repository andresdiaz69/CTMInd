# Stored Procedure: SP_portal_rhh_empleado_estudio

## Usa los objetos:
- [[gen_paises]]
- [[gen_usuarios]]
- [[GTH_Homologacion]]
- [[GTH_ModalidadEstudio]]
- [[GTH_TipoEstudio]]
- [[rhh_estudio]]
- [[rhh_portal_estudio]]
- [[rhh_tbestud]]
- [[rhh_tbinsti]]

```sql




-- =============================================
-- Author:		David Alarcon Betancur
-- Create date: 10-08-2011
-- Description:	Obtiene los estudios de un empleado para ser mostrados en el portal

--SPA2021 – 0008  Agregar campos en estudios
--Modify by:	Alexander Vargas
--Modify date:	13/01/2021
--Description:	Se agregan nuevos campos a la consulta de acuerdo a requerimiento

--SPA2021 – 0008  Agregar campos en estudios
--Modify by:	Alexander Vargas
--Modify date:	09/03/2021
--Description:	Se agregan validación para cuando gra_son esta en nulo se convierte en 0

--SPA2021 – 0008  Agregar campos en estudios
--Modify by:	Alexander Vargas
--Modify date:	25/03/2021
--Description:	Se agregan cons en los campos consultados


--SPA2021 – 0008  Agregar campos en estudios
--Modify by:	Alexander Vargas
--Modify date:	08/04/2021
--Description:	ajuste valida nulo para el campo cur_act

--SPA2021 – 0008  Agregar campos en estudios
--Modify by:	Alexander Vargas
--Modify date:	09/04/2021
--Description:	se incluye cons en la llave de los estudios de portal
--				que se excluyen

--SPA2021 – 0008  Agregar campos en estudios
--Modify by:	Alexander Vargas
--Modify date:	12/04/2021
--Description:	se agrega cod_even en los campos consultados para
--				enviarlo como parametro al modificar estudio


--SPA2022 – 0045  Eliminar registro HV 
--Modify by:	Alexander Vargas
--Modify date:	08/06/2022
--Description:	se agrega campo para identificar cuales son los estudios nuevos, para
--				poderlos borrar si se necesita

--SPA2023 - 0139 Campos para homologación de estudios
--Modify by:	Alexander Vargas
--Modify date:	10/03/2023
--Description:	se agregan los siguientes campos a la tabla  GTH_RptEstudio 
--ndiploma,nacta,nfolio,nlibro,est_exterior,inst_exterior,cod_pais,est_homologa,fec_homologa
-- =============================================
CREATE PROCEDURE [dbo].[SP_portal_rhh_empleado_estudio] 
	@loginEmplea NVARCHAR(20)

--WITH ENCRYPTION
AS
BEGIN

	DECLARE @cod_Emp CHAR(12)
	SELECT @cod_Emp=cod_emp FROM gen_usuarios WHERE RTRIM(log_usu) LIKE @loginEmplea
	
	SELECT --A.cod_emp , A.cod_est , A.cod_ins
		A.cod_emp, A.cod_est,EST.nom_est AS Estudio, A.nom_est, A.cod_ins,insti.nom_ins, A.ano_est, A.sem_apr, A.hor_est, ISNULL(A.gra_son,0) AS gra_son, A.fec_gra, 
			A.nro_tar, CONVERT(BIT,A.ind_can) AS ind_can, A.tip_est,  
			A.tipo_est,A.mod_est, A.fec_ven, ISNULL(A.cur_act,0) AS cur_act,A.NRO, modalidad.des_mod, CONVERT(BIT,A.ind_estsup) AS ind_estsup,
			A.num_sg_act, A.num_act_cons,A.fec_cons,tipoEst.des_tipo,A.cons, A.cod_even, 'Aprobado' AS estado, 
			A.ndiploma,A.nacta,A.nlibro,A.nfolio,ISNULL(A.est_exterior,0) AS est_exterior,A.inst_exterior,ISNULL(A.cod_pais,0) AS cod_pais,ISNULL(A.est_homologa,'01') AS est_homologa,A.fec_homologa, pais.nom_pai, homologa.nom_homologa   
	FROM rhh_estudio A INNER JOIN rhh_tbestud est ON A.cod_est=EST.cod_est COLLATE DATABASE_DEFAULT 
	INNER JOIN rhh_tbinsti insti ON A.cod_ins=insti.cod_ins COLLATE DATABASE_DEFAULT 
	LEFT JOIN GTH_ModalidadEstudio modalidad ON A.mod_est=modalidad.mod_est 
	LEFT JOIN GTH_TipoEstudio tipoEst ON A.tipo_est=tipoEst.tipo_est 
	LEFT JOIN gen_paises pais ON A.cod_pais=pais.cod_pai COLLATE DATABASE_DEFAULT 
	LEFT JOIN GTH_Homologacion homologa ON A.est_homologa=homologa.cod_homologa COLLATE DATABASE_DEFAULT 
	 WHERE A.cod_emp = @cod_Emp--'80814720'  
		AND A.cod_emp NOT IN (SELECT cod_emp FROM rhh_portal_estudio B WHERE A.cod_emp=B.cod_emp AND A.cod_est=B.cod_est AND A.cod_ins=B.cod_ins AND A.cons=B.cons AND A.cod_even=B.cod_even)
	UNION ALL
	SELECT --cod_emp , cod_est , cod_ins 
		cod_emp, A.cod_est, EST.nom_est, A.nom_est, A.cod_ins,insti.nom_ins, ano_est, sem_apr, hor_est, ISNULL(gra_son,0) AS gra_son, fec_gra, nro_tar, CONVERT(BIT,ind_can) AS ind_can, A.tip_est, 
		A.tipo_est, A.mod_est,A.fec_ven, ISNULL(A.cur_act,0) AS cur_act, A.NRO, modalidad.des_mod, CONVERT(BIT,A.ind_estsup) AS ind_estsup,
		A.num_sg_act, A.num_act_cons,A.fec_cons,tipoEst.des_tipo, A.cons,A.cod_even, 
		IIF(EXISTS(SELECT cod_emp FROM  rhh_estudio WHERE cod_emp=@cod_Emp AND cod_est=A.cod_est),'Pendiente','Nuevo') as estado,
		A.ndiploma,A.nacta,A.nlibro,A.nfolio,ISNULL(A.est_exterior,0) AS est_exterior,A.inst_exterior,ISNULL(A.cod_pais,0) AS cod_pais,ISNULL(A.est_homologa,'01') AS est_homologa,A.fec_homologa, pais.nom_pai, homologa.nom_homologa   
	FROM rhh_portal_estudio A  INNER JOIN rhh_tbestud est ON A.cod_est=EST.cod_est COLLATE DATABASE_DEFAULT 
	INNER JOIN rhh_tbinsti insti ON A.cod_ins=insti.cod_ins COLLATE DATABASE_DEFAULT 
	LEFT JOIN GTH_ModalidadEstudio modalidad ON A.mod_est=modalidad.mod_est 
	LEFT JOIN GTH_TipoEstudio tipoEst ON A.tipo_est=tipoEst.tipo_est COLLATE DATABASE_DEFAULT 
	LEFT JOIN gen_paises pais ON A.cod_pais=pais.cod_pai COLLATE DATABASE_DEFAULT 
	LEFT JOIN GTH_Homologacion homologa ON A.est_homologa=homologa.cod_homologa COLLATE DATABASE_DEFAULT 
	 WHERE cod_emp = @cod_Emp--'80814720'
	
END

```
