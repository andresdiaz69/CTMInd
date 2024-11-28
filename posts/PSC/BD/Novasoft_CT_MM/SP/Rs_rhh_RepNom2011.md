# Stored Procedure: Rs_rhh_RepNom2011

## Usa los objetos:
- [[gth_portal_configuracion]]
- [[rhh_EmpConv]]
- [[rhh_emplea]]
- [[rhh_hislab]]
- [[Server_vinculado]]

```sql


CREATE PROCEDURE [dbo].[Rs_rhh_RepNom2011]
	@cod_cia	CHAR(3) 	= '%',
	@cod_conv	VARCHAR(15) = '%',
	@cod_suc	CHAR(3)		= '%',
	@cod_cco	CHAR(10)	= '%',
	@cod_cl1	VARCHAR(12)	= '%',
	@cod_cl2	VARCHAR(12)	= '%',
	@cod_cl3	VARCHAR(12)	= '%',
	@cod_cl4	VARCHAR(12)	= '%',
	@cod_cl5	VARCHAR(12)	= '%',
	@cod_cl6	VARCHAR(12)	= '%',
	@cod_cl7	VARCHAR(12)	= '%',
	@cod_area	VARCHAR(12)	= '%',
	@anoC		VARCHAR(4)	= '%',
	@mesC		VARCHAR(2)	= '%'

-- ======================================================================
-- Author:		Jorge Diaz
-- Create date: Mayo 14 2021
-- Description:	Reporte Estadisticas del Portal Consulta de Reportes
--
--				****************************************************************************************************
--
--				****************************************************************************************************
--
-- EXEC Rs_rhh_RepNom2011 '%','%','002','%','%','%','%','%','%','%','%','%','%','%'
-- EXEC Rs_rhh_RepNom2011 '%','%','%','71111003','%','%','%','%','%','%','%','%','%','%'
-- EXEC Rs_rhh_RepNom2011 '%','%','%','%','%','%','010','%','%','%','%','%','%','%'
-- EXEC Rs_rhh_RepNom2011 '%','%','%','%','%','%','%','%','%','%','%','%','2021','5'
-- EXEC Rs_rhh_RepNom2011 '%','%','%','%','%','%','%','%','%','%','%','%','%','%'
--

--SRS2023 - 0011 Tamanio variable server vinculado
--Modified by:		Alexander Vargas
--Modified date:	16/01/2023
--Description:		Se aumenta el tamaño de la variable serv_vinculado a 50 caracteres
-- ======================================================================
--WITH ENCRYPTION
AS
BEGIN

	SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
	SET NOCOUNT ON;
	
	--*****************************************
	--Se agrega la opción para manejo de servidor vinculado
	--Permite realizar consultas entre 2 bases en
	--diferentes servidores
	DECLARE @serv_vinculado VARCHAR(50)= NULL
	SET @serv_vinculado=@@SERVERNAME
	
	IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Server_vinculado]') AND type in (N'U'))
	BEGIN
		
		SELECT @serv_vinculado= server FROM Server_vinculado
	
		IF(@serv_vinculado IS NULL OR @serv_vinculado='' )
		BEGIN
			SET @serv_vinculado=@@SERVERNAME
		END
	END		
	--*****************************************


	-- Temporal de usuarios segun filtros
	DECLARE @hoy DATE = CAST(GETDATE() AS DATE);
	SELECT emp.cod_cia, emp.login_portal 
	INTO #tmpEmpls 
	FROM rhh_emplea emp 
	WHERE emp.cod_cia LIKE RTRIM(@cod_cia) 
		AND @cod_conv = 
			CASE WHEN @cod_conv='%' THEN @cod_conv 
			ELSE ( SELECT TOP 1 cod_conv FROM rhh_EmpConv WHERE cod_emp=emp.cod_emp AND (@hoy BETWEEN fec_ini AND fec_fin) ) 
			END 
		AND emp.cod_suc LIKE RTRIM(@cod_suc) 
		AND emp.cod_cco LIKE RTRIM(@cod_cco) 
		AND emp.cod_cl1 LIKE RTRIM(@cod_cl1) 
		AND emp.cod_cl2 LIKE RTRIM(@cod_cl2) 
		AND emp.cod_cl3 LIKE RTRIM(@cod_cl3) 
		AND emp.cod_cl4 LIKE RTRIM(@cod_cl4) 
		AND emp.cod_cl5 LIKE RTRIM(@cod_cl5) 
		AND emp.cod_cl6 LIKE RTRIM(@cod_cl6) 
		AND emp.cod_cl7 LIKE RTRIM(@cod_cl7) 
		AND @cod_area = 
			CASE WHEN @cod_area='%' THEN @cod_area 
			ELSE ( SELECT TOP 1 cod_area FROM rhh_hislab WHERE cod_emp=emp.cod_emp AND fec_ini<=@hoy ORDER BY fec_ini DESC ) 
			END;


	-- Temporal de auditoria del portal
	DECLARE @cadSQL01 NVARCHAR(max), @BaseDatos VARCHAR(100), @tbAudit VARCHAR(300);
	SELECT @BaseDatos = BaseDatos FROM gth_portal_configuracion;
	SET @tbAudit = QUOTENAME(@serv_vinculado) + '.' + QUOTENAME(RTRIM(@BaseDatos)) + '.dbo.Auditoria';
	SET @cadSQL01 = N'
	SELECT cod_usuario, fecha, modulo 
	FROM '+@tbAudit+' 
	WHERE RTRIM(LTRIM(MODULO)) IN 
		(''AnexoRetencion'',''CertificadoLaboral'',''CertingresosRetenciones'',''CertiVacaciones'',
			''ComprobantePago'',''CuponVacaciones'',''SaldoPrestamos'') 
		AND DATEPART(yy,fecha) = CASE '''+@anoC+''' WHEN ''%'' THEN DATEPART(yy,fecha) ELSE CAST('''+@anoC+''' AS INT) END 
		AND DATEPART(mm,fecha) = CASE '''+@mesC+''' WHEN ''%'' THEN DATEPART(mm,fecha) ELSE CAST('''+@mesC+''' AS INT) END 
		AND cod_usuario IN (SELECT login_portal FROM #tmpEmpls) 
	ORDER BY 1,2,3';

	CREATE TABLE #tmpAudit ( cod_usuario CHAR(30) COLLATE DATABASE_DEFAULT, fecha DATETIME, modulo CHAR(30) );
	INSERT INTO #tmpAudit 
	EXEC(@cadSQL01);
	
	
	-- Tabla final agrupada
	SELECT emp.cod_cia, DATEPART(yy,aud.fecha) AS ano, DATEPART(mm,aud.fecha) AS mes, 
		aud.modulo, 
		CASE modulo 
			WHEN 'AnexoRetencion' THEN 'Anexo Retencion' 
			WHEN 'CertificadoLaboral' THEN 'Certificado Laboral' 
			WHEN 'CertingresosRetenciones' THEN 'Ingresos y Retenciones' 
			WHEN 'CertiVacaciones' THEN 'Libro de Vacaciones' 
			WHEN 'ComprobantePago' THEN 'Comprobante Pago' 
			WHEN 'CuponVacaciones' THEN 'Cupon Vacaciones' 
			WHEN 'SaldoPrestamos' THEN 'Saldo Prestamos' 
			ELSE ''
		END AS lblModulo,
		COUNT(*) AS consultas 
	FROM #tmpAudit aud 
		INNER JOIN #tmpEmpls emp ON aud.cod_usuario=emp.login_portal 
	GROUP BY emp.cod_cia, DATEPART(yy,aud.fecha), DATEPART(mm,aud.fecha), 
		aud.modulo 
	ORDER BY 1,2,3,4;

END

```
