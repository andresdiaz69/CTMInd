# Stored Procedure: sp_rhh_CostosPersonal_fp

## Usa los objetos:
- [[fn_rhh_CargoFch]]
- [[fn_rhh_Hislab_NumSec_cont]]
- [[rhh_cargos]]
- [[rhh_DefPlanta]]
- [[rhh_hislab]]
- [[rhh_liqhis]]
- [[rhh_Planta]]
- [[rhh_rep_column_concep_param]]
- [[rhh_rep_column_param]]
- [[rhh_rep_param]]

```sql

-- Alexandra Mesa, 12/2019
-- Consulta para archivo plano de Costos de personal para la Contaduria General
-- Se ajusta procedimiento para que muestre correctamente agrupados los valores con base el grado y tipo de vinculación, AJMDLO 28/02/2020
--- exec sp_rhh_CostosPersonal_fp '20190101','20191231','COPE','01012','083',0
CREATE PROCEDURE [dbo].[sp_rhh_CostosPersonal_fp]
    @FecIni DATETIME, -- Fecha de inicio de consulta de los costos
	@FecCte DATETIME, -- Fecha de corte de la nómina para extraer la información de los históricos, de acuerdo a la información enviada, es mensual
	@CodRep VARCHAR(10), -- Reporte columnario configurado con base en las columnas y conceptos que solicita el reporte
	@CodPer CHAR(5), -- Período de consulta de la información, solo se pinta en la consulta
	@Consec CHAR(3), -- valor campo Concepto del primer registro tipo D (Consecutivo)
	@IndFec INT	-- 0 Fecha de liquidación, 1 fecha de corte
AS
BEGIN

	--DECLARE @FecIni	DATETIME;
	DECLARE @columns	NVARCHAR(MAX), 
		    @columSS	NVARCHAR(MAX),
		    @columST	NVARCHAR(MAX),
		    @columRS	NVARCHAR(MAX),
		    @sql		NVARCHAR(MAX),
		    @totPl		INT;

	IF OBJECT_ID('tempdb..#RESUM') IS NOT NULL
		DROP TABLE #RESUM;

	CREATE TABLE #RESUM 
	(
		cod_emp		char(12) COLLATE DATABASE_DEFAULT,
		nom_column	varchar(30) COLLATE DATABASE_DEFAULT,
		cod_car		char(8) COLLATE DATABASE_DEFAULT,
		ord_column	int,
		gracargo	char(50) COLLATE DATABASE_DEFAULT,
		val_liq		money,
		CONCEPTO	char(4) COLLATE DATABASE_DEFAULT,
		TIPOVINCULACION char(2) COLLATE DATABASE_DEFAULT,
		DESCARGO	varchar(100) COLLATE DATABASE_DEFAULT,
		NomRep		varchar(100) COLLATE DATABASE_DEFAULT,
		cap_tot		int
	);

	SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;

	SET LANGUAGE Spanish;

	--SET @FecIni = dateadd([month], datediff([month], '19000101', @FecCte), '19000101');
	SET @columns = '';
	SET @columSS = '';
	SET @columST = '';
	SET @columRS = '';

	-- Trae la nformación de la planta activa a la fecha de corte del proceso
	IF OBJECT_ID('tempdb..#PLANTAPER') IS NOT NULL
		drop table #PLANTAPER;

	SELECT PD.cod_car, PD.cod_cco, PD.cod_cl1, PD.cod_area, PD.cap_tot
	INTO #PLANTAPER
	FROM rhh_Planta P
	INNER JOIN rhh_DefPlanta PD ON P.cod_pla = PD.cod_pla
	WHERE P.fec_ini >= (SELECT MAX(fec_ini) FROM rhh_Planta WHERE fec_ini <= @FecCte) AND 
		  P.fec_ini <= @FecCte;

	SELECT @totPl = SUM(cap_tot) FROM #PLANTAPER;
     SET @totPl = ISNULL(@totPl,0); 

	-- Trae la cantidad de empleados por cargo y Tipo de vinculación a fecha de corte
	IF OBJECT_ID('tempdb..#TOTPORC') IS NOT NULL
	   drop table #TOTPORC;

    WITH A AS
    (
	SELECT (COUNT(DISTINCT COD_EMP)) AS TOTCAR, dbo.fn_rhh_CargoFch(h.cod_emp,@FecCte,0) as cod_car, 
		   CASE H.cod_nov -- Campo novedad de la historia laboral
				WHEN '01' THEN 'V1' -- Carrera Administrativa
				WHEN '02' THEN 'V3' -- Libre Nombramiento
				WHEN '03' THEN 'V4' -- Planta Temporal
				WHEN '05' THEN 'V2' -- De periodo
				WHEN '06' THEN 'V5' -- Trabajador Oficial
				WHEN '07' THEN 'V6' -- Contrato Laboral
				ELSE 'V4'
		   END AS cod_nov 
	FROM rhh_hislab h 
     INNER JOIN rhh_cargos c on dbo.fn_rhh_CargoFch(h.cod_emp,@FecCte,0) = c.cod_car
     WHERE H.num_sec = dbo.fn_rhh_Hislab_NumSec_cont(H.cod_emp,H.cod_con,@FecCte,0,1)
	GROUP BY H.cod_emp,h.cod_nov)

    SELECT SUM(TOTCAR) AS TOTCAR, cod_car, cod_nov 
    INTO #TOTPORC 
    FROM A 
    GROUP BY cod_car,cod_nov;
	

	INSERT INTO #RESUM
	SELECT H.cod_emp, RPC.nom_column, HL.cod_car, RPC.ord_column,
			RTRIM(SUBSTRING(HL.cod_car,CHARINDEX(' ',HL.cod_car)+1,LEN(HL.cod_car))) AS GRACARGO, 
			CASE H.cod_con WHEN '000001' THEN 0 ELSE ISNULL(H.val_liq,0) END AS val_liq,
			CASE	C.niv_car 
			     WHEN '01' THEN '1.02' 
				WHEN '06' THEN '1.04'
				WHEN '07' THEN '1.06'
				WHEN '02' THEN '1.08'
				WHEN '03' THEN '1.10'
				WHEN '08' THEN '1.12'
				ELSE  '1.12'
		   END AS CONCEPTO,
		   CASE HL.cod_nov -- Campo novedad de la historia laboral
				WHEN '01' THEN 'V1'
				WHEN '02' THEN 'V3'
				WHEN '03' THEN 'V4'
				WHEN '05' THEN 'V2'
				ELSE 'V4'
		   END AS TIPOVINCULACION,
		   LEFT(RTRIM(CASE WHEN RIGHT(RTRIM(HL.cod_car),2) > 0 THEN LEFT(RTRIM(c.nom_car),LEN(rtrim(c.nom_car))-2) 
				ELSE RTRIM(c.nom_car) 
		   END),100) AS DESCARGO,
		   RTRIM(rp.Nom_rep) AS nomrep, ISNULL(PP.cap_tot,0) AS cap_tot
	FROM  rhh_rep_param rp
	INNER JOIN rhh_rep_column_param RPC ON rp.cod_rep = RPC.cod_rep
	LEFT JOIN rhh_rep_column_concep_param RPCC ON RPC.cod_rep = RPCC.cod_rep AND RPC.ord_column = RPCC.ord_column
	LEFT JOIN rhh_liqhis H ON RPCC.cod_con = H.cod_con AND RPCC.mod_liq = H.mod_liq
	INNER JOIN rhh_hislab HL ON HL.cod_emp = H.cod_emp AND H.cod_cont = hl.cod_con AND HL.num_sec = dbo.fn_rhh_Hislab_NumSec_cont(H.cod_emp,H.cod_cont,H.fec_cte,0,1)
	INNER JOIN rhh_cargos C ON HL.cod_car = C.cod_car
	LEFT JOIN #PLANTAPER PP ON C.cod_car = PP.cod_car
	WHERE CASE @IndFec WHEN 0 THEN H.fec_liq ELSE H.fec_cte END >= @FecIni AND H.fec_cte <= @FecCte AND
			rp.cod_rep = @CodRep
	ORDER BY RPC.ord_column, HL.cod_car;
	--select * from #RESUM ORDER BY DESCARGO, gracargo;

	-- Construcción de la varable que trae las columnas definidas en el columnario
	SELECT @columns = @columns+', '+QUOTENAME(categoria)
	FROM (
			SELECT CONVERT(char(4),ord_column) as orden,nom_column as categoria 
			FROM rhh_rep_column_param AS t
			WHERE cod_rep = @CodRep
			GROUP BY ord_column,t.nom_column
		 ) AS COLUMNAS;
--select * from #RESUM;
	SET @columSS = @columSS+STUFF(REPLACE(@columns,', [',', ISNULL(['),1,1,'');
	SET @columSS = STUFF(REPLACE(@columsS,']','],0)'),1,1,'');
	--SELECT @columSS;
	SET @columST = @columST+STUFF(REPLACE(@columns,', [',', CONVERT(CHAR(20),'''') AS '''),1,1,'');
	SET @columST = STUFF(REPLACE(@columST,']',''''),1,1,'');
	--SELECT @columST;
	SET @columRS = @columRS+STUFF(REPLACE(@columns,', [',', CONVERT(CHAR(20), ['),1,1,'');
	SET @columRS = STUFF(REPLACE(@columRS,']','])'),1,1,'');
	--SELECT @columRS;
	 
	-- Consulta dinámica que permite que se modifiquen las columnas del reporte y su contenido, variable @columns
	SET @sql= 'IF OBJECT_ID(''tempdb..#tot'') IS NOT NULL'+CHAR(13)+CHAR(10);
	SET @sql= @sql+'drop table #tot;
					select * into #tot from (	select cod_car, gracargo, CONCEPTO, TIPOVINCULACION, DESCARGO, cap_tot, sum(isnull(val_liq,0)) as valor, nom_column as categoria 
											from #RESUM 
											where val_liq > 0 
											group by cod_emp, cod_car, gracargo, CONCEPTO, TIPOVINCULACION, DESCARGO, cap_tot, nom_column) as t 
					pivot (sum(valor) for categoria in('+STUFF(replace(@columns,',[',',['),1,1,'')+')) as t;'+CHAR(13)+CHAR(10);
    -- Total de funcionarios en la consulta
	SET @sql= @sql+'IF OBJECT_ID(''tempdb..#TOTPER'') IS NOT NULL
						drop table #TOTPER;'+CHAR(13)+CHAR(10);

	SET @sql= @sql+'SELECT SUM(TOTCAR) AS TOTPER, R.Nom_rep  AS nomrep  
				INTO #TOTPER       
				FROM rhh_rep_param R, #TOTPORC
				WHERE R.cod_rep = '''+RTRIM(@CodRep)+'''
				GROUP BY R.Nom_rep;'+CHAR(13)+CHAR(10);
	SET @sql= @sql+''--prueba
	SET @sql= @sql+'IF OBJECT_ID(''tempdb..#TOTAL'') IS NOT NULL
						drop table #TOTAL;'+CHAR(13)+CHAR(10);
    -- Se trae la información de las columnas con base en lo conceptos definidos en ellas y hace el llamado con nombres definidos en las columnas del reporte
	SET @sql= @sql+'SELECT ''D'' AS NIVEL, CONCEPTO, ''000'' AS CONSECUTIVO, DESCARGO AS DENOMINACION_DEL_CARGO, T.gracargo AS GRADO,
						   convert(char(15),''0'') AS CARGOS_APROBADOS, convert(char(15),''0'') AS CARGOS_PROVISTOS, T.TIPOVINCULACION AS TIPO_DE_VINCULACION'+@columns+'
					INTO #TOTAL
					FROM #tot T 
					WHERE T.cod_car = ''xx'';
					
					INSERT INTO #TOTAL
					SELECT ''D'' AS NIVEL, CONCEPTO, 
						   RIGHT(''00''+ RTRIM(CONVERT(CHAR(3),ROW_NUMBER() OVER(ORDER BY CONCEPTO,t.DESCARGO,t.TIPOVINCULACION))),3) AS CONSECUTIVO, 
						   t.DESCARGO AS DENOMINACION_DEL_CARGO, t.gracargo AS GRADO,
						   CONVERT(CHAR(15),ISNULL(t.cap_tot,0)) AS CARGOS_APROBADOS, CONVERT(CHAR(15),ISNULL(TC.TOTCAR,0)) AS CARGOS_PROVISTOS, 
						   t.TIPOVINCULACION AS TIPO_DE_VINCULACION,'
						   +@columSS +'
					FROM #tot t 
					LEFT JOIN  #TOTPORC TC ON t.cod_car = TC.cod_car AND t.TIPOVINCULACION = TC.cod_nov
					GROUP BY t.cod_car, t.gracargo, CONCEPTO, t.DESCARGO, t.cap_tot, TC.TOTCAR, t.TIPOVINCULACION'+@columns+';'+CHAR(13)+CHAR(10);

-- Creación de la tabla resultado
	SET @sql= @sql+'SELECT ''S'' AS NIVEL, CONVERT(CHAR(5),TOTPER) AS CONCEPTO,'''+ @CodPer+''' AS CONSECUTIVO, 
					'''+LEFT(RTRIM(DATENAME(M,@FecCte)),3)+CONVERT(CHAR(4),YEAR(@FecCte))+''' AS DENOMINACION_DEL_CARGO, 
					CONVERT(VARCHAR(50),nomrep) AS GRADO, '''' AS CARGOS_APROBADOS, '''' AS CARGOS_PROVISTOS, 
					''  '' AS TIPO_DE_VINCULACION,'+@columST+'
					FROM #TOTPER
					UNION ALL
					SELECT ''D'' AS NIVEL, '''+CONVERT(CHAR(5),@Consec)+''' AS CONCEPTO,''000'' AS CONSECUTIVO, 
					''NA'' AS DENOMINACION_DEL_CARGO, ''NA'' AS GRADO, '''+CONVERT(CHAR(4),@totPl)+''' AS CARGOS_APROBADOS, CONVERT(CHAR(5),TOTPER) AS CARGOS_PROVISTOS, 
					''V0'' AS TIPO_DE_VINCULACION,'+@columST+'
					FROM #TOTPER
					UNION ALL
					select NIVEL, CONCEPTO, CONSECUTIVO, DENOMINACION_DEL_CARGO, GRADO, CARGOS_APROBADOS, CARGOS_PROVISTOS, TIPO_DE_VINCULACION,'+@columRS+'
					from #TOTAL;	'
	--select @sql;
	EXEC sp_executesql @sql;
END;
```
