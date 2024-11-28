# Stored Procedure: sp_sst_SST79

## Usa los objetos:
- [[gen_ccosto]]
- [[gen_sucursal]]
- [[GTH_Areas]]
- [[GTH_Emplea_Externo]]
- [[GTH_Requisicion]]
- [[GTH_RequisicionEmp]]
- [[GTH_RptEmplea]]
- [[GTH_RptExamenMedico]]
- [[GTH_TipoExamen]]
- [[rhh_cargos]]
- [[rhh_emplea]]
- [[rhh_hislab]]
- [[SST_ExaMedicos]]
- [[SST_ExamenMedicoEmplea]]

```sql

--

-- ======================================================================
-- Author:		Jorge Diaz
-- Create date: Julio 31 de 2020
-- Description:	Proceso para consulta de Lista Examenes Realizados
--
--	2022.11.30	Jorge Diaz	Se adiciona filtro por empleado
--							Se toman datos de la ultima historia laboral
--
--
-- EXEC sp_sst_SST79 '%','%','%','%','%','%','%','%',1,'19000101','20990101'
--
-- ======================================================================
CREATE PROCEDURE [dbo].[sp_sst_SST79]
	@cod_cia	CHAR(3) = '%',
	@cod_suc	CHAR(3) = '%',
	@cod_cco	CHAR(10) = '%',
	@cod_area	VARCHAR(12) = '%',
	@cod_car	CHAR(8) = '%',
	@cod_emp	CHAR(12) = '%',
	@per_exa	VARCHAR(10) = '%',
	@prov_resp	CHAR(12) = '%',
	@incCand	bit = 1,
	@fch_i DATE, 
	@fch_f DATE

   
AS
BEGIN

	SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
	SET NOCOUNT ON;

	
	--- Tabla de empleados
	SELECT exa.cod_emp AS [Código], 
		LEFT(RTRIM(emp.nom_emp)+' '+RTRIM(emp.ap1_emp)+' '+RTRIM(emp.ap2_emp),200) AS [Empleado], 
		CAST('' AS VARCHAR(200)) AS [Candidato],
		CAST(suc.nom_suc AS VARCHAR(100)) AS [Sucursal], 
		CAST(cco.nom_cco AS VARCHAR(100)) AS [Centro de Costo], 
		CAST(are.des_area AS VARCHAR(100)) AS [Área], 
		car.nom_car AS [Cargo], 
		CAST((CASE exa.per_exa 
			WHEN 1 THEN 'Ingreso' WHEN 2 THEN 'Periódicos' WHEN 3 THEN 'Retiro' WHEN 4 THEN 'Posincapacidad' 
			WHEN 5 THEN 'Reintegro' WHEN 6 THEN 'Cambio de Ocupación'  ELSE '' END) AS VARCHAR(30) ) AS [Clasificación], 
		tipe.Des_TipEx AS [Tipo Examen], 
		texa.des_exa_med AS [Examen Realizado], 
		ext.nom_emp_ext AS [IPS Responsable], 
		exa.fec_exmed AS [Fecha],
		exa.obs_exmed AS [Observaciones y/o Recomendaciones],
	 	CASE exa.ind_apto WHEN 1 THEN 'No' WHEN 2 THEN 'Si' ELSE '  ' END AS [Restricciones para el cargo?], 
		CAST('' AS VARCHAR(250)) AS [Solicitud de Cargo], 
		'  ' AS [Contratado] 
	INTO #tmpDatos 
	FROM SST_ExamenMedicoEmplea exa 
		INNER JOIN rhh_hislab hlab ON exa.cod_emp=hlab.cod_emp 
			-- AND hlab.fec_ini=(SELECT MAX(fec_ini) FROM rhh_hislab WHERE cod_emp=exa.cod_emp AND fec_ini<=exa.fec_exmed GROUP BY cod_emp) 
			AND hlab.fec_ini=(SELECT MAX(fec_ini) FROM rhh_hislab WHERE cod_emp=exa.cod_emp) 
		INNER JOIN rhh_emplea emp ON exa.cod_emp = emp.cod_emp 
		LEFT JOIN gen_sucursal suc ON hlab.cod_suc=suc.cod_suc 
		LEFT JOIN gen_ccosto cco ON hlab.cod_cco=cco.cod_cco
		LEFT JOIN GTH_Areas are ON hlab.cod_area=are.cod_area AND hlab.cod_cia=are.cod_cia 
		LEFT JOIN rhh_cargos car ON car.cod_car = hlab.cod_car AND car.cod_cia = hlab.cod_cia 
		LEFT JOIN GTH_TipoExamen tipe ON exa.tip_ex = tipe.Tip_Ex 
		LEFT JOIN SST_ExaMedicos texa ON exa.cod_exa_med = texa.cod_exa_med 
		LEFT JOIN GTH_Emplea_Externo ext ON exa.prov_resp = ext.cod_emp_ext 
	WHERE hlab.cod_cia LIKE RTRIM(@cod_cia) 
		AND hlab.cod_suc LIKE RTRIM(@cod_suc) 
		AND hlab.cod_cco LIKE RTRIM(@cod_cco) 
		AND hlab.cod_area LIKE RTRIM(@cod_area) 
		AND hlab.cod_car LIKE RTRIM(@cod_car) 
		AND hlab.cod_emp LIKE RTRIM(@cod_emp) 
		AND exa.per_exa = CASE WHEN @per_exa='%' THEN exa.per_exa ELSE CAST(@per_exa AS INT) END 
		AND exa.prov_resp LIKE RTRIM(@prov_resp) 
		AND exa.fec_exmed BETWEEN @fch_i AND @fch_f 
	ORDER BY hlab.cod_cia, car.nom_car, exa.cod_emp;


	
	--- Adiciona tabla de candidatos
	IF @incCand = 1
	BEGIN
	
		INSERT INTO #tmpDatos 
		SELECT exa.cod_emp AS [Código], CAST('' AS VARCHAR(200)) AS [Empleado], 
			LEFT(RTRIM(emp.nom_emp)+' '+RTRIM(emp.ap1_emp)+' '+RTRIM(emp.ap2_emp),200) AS [Candidato], 
			'No Aplica' AS [Sucursal], 'No Aplica' AS [Centro de Costo], 'No Aplica' AS [Área], 
			car.nom_car AS [Cargo], 
			'Ingreso' AS [Clasificación], 
			tipe.Des_TipEx AS [Tipo Examen], 
			texa.des_exa_med AS [Examen Realizado], 
			ext.nom_emp_ext AS [IPS Responsable], 
			exa.fec_exmed AS [Fecha],
			exa.obs_exmed AS [Observaciones y/o Recomendaciones], 
			CASE exa.ind_apto WHEN 1 THEN 'No' WHEN 2 THEN 'Si' ELSE '  ' END AS [Restricciones para el cargo?], 
			CAST(req.num_req AS VARCHAR(10))+' - '+car.nom_car AS [Solicitud de Cargo], 
			CASE rEmp.ind_cnt 
				WHEN 0 THEN 'No' 
				WHEN 1 THEN 'Si' 
				ELSE '  '
			END AS [Contratado] 
		FROM GTH_RptExamenMedico exa 
			INNER JOIN GTH_Requisicion req ON exa.num_req=req.num_req 
			INNER JOIN GTH_RptEmplea emp ON emp.cod_emp = exa.cod_emp 
			LEFT JOIN rhh_cargos car ON car.cod_car = req.car_sol AND car.cod_cia = req.cod_cia 
			LEFT JOIN GTH_TipoExamen tipe ON exa.tip_ex = tipe.Tip_Ex 
			LEFT JOIN SST_ExaMedicos texa ON exa.cod_exa_med = texa.cod_exa_med 
			LEFT JOIN GTH_Emplea_Externo ext ON exa.prov_resp = ext.cod_emp_ext 
			LEFT JOIN GTH_RequisicionEmp rEmp ON rEmp.cod_emp = emp.cod_emp AND rEmp.num_req=exa.num_req
		WHERE emp.cod_emp NOT IN (SELECT cod_emp FROM rhh_emplea) 
			AND req.cod_cia LIKE RTRIM(@cod_cia) 
			AND req.cod_suc LIKE RTRIM(@cod_suc) 
			AND req.cod_cco LIKE RTRIM(@cod_cco) 
			AND req.car_sol LIKE RTRIM(@cod_car) 
			AND exa.cod_emp LIKE RTRIM(@cod_emp) 
			AND @per_exa IN ('%','1') 
			AND exa.prov_resp LIKE RTRIM(@prov_resp) 
			AND exa.fec_exmed BETWEEN @fch_i AND @fch_f 
		ORDER BY req.cod_cia, car.nom_car, exa.cod_emp;

	END
	
	
	--- Tabla final
	SELECT * FROM #tmpDatos ORDER BY 3,1;

	--- Sin datos
	IF @@ROWCOUNT=0
		SELECT 'NO SE HA ENCONTRADO INFORMACION...!';
	
END

```
