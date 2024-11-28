# Stored Procedure: Rs_rhh_RepNom2011A

## Usa los objetos:
- [[gth_portal_configuracion]]
- [[rhh_EmpConv]]
- [[rhh_emplea]]
- [[rhh_hislab]]
- [[Server_vinculado]]

```sql


CREATE PROCEDURE [dbo].[Rs_rhh_RepNom2011A]
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
	@ano		INT	= 2021,
	@mes		INT	= 5,
	@modulo		CHAR(30)	= ''

-- ======================================================================
-- Author:		Jorge Diaz
-- Create date: Mayo 14 2021
-- Description:	Reporte Detalle Estadisticas del Portal Consulta de Reportes
--
--				****************************************************************************************************
--
--				****************************************************************************************************
--
-- EXEC Rs_rhh_RepNom2011A '%','%','%','%','%','%','%','%','%','%','%','%',2021,4,'CertificadoLaboral'
-- EXEC Rs_rhh_RepNom2011A '%','%','%','%','%','%','%','%','%','%','%','%',2020,3,'CertificadoLaboral'
-- EXEC Rs_rhh_RepNom2011A '%','%','%','%','%','%','%','%','%','%','%','%',2021,5,'CuponVacaciones'
-- EXEC Rs_rhh_RepNom2011A '%','%','%','%','%','%','%','%','%','%','%','%',2021,5,'CertiVacaciones'
-- EXEC Rs_rhh_RepNom2011A '%','%','%','%','%','%','%','%','%','%','%','%',2021,5,'SaldoPrestamos'
-- EXEC Rs_rhh_RepNom2011A '%','%','%','%','%','%','%','%','%','%','%','%',2020,1,'CertingresosRetenciones'
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
	SELECT emp.cod_cia, emp.cod_emp, emp.login_portal, RTRIM(emp.ap1_emp)+' '+RTRIM(emp.ap2_emp)+' '+RTRIM(emp.nom_emp) AS nombres 
	INTO #tmpEmpls2 
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
	DECLARE @cadSQL02 NVARCHAR(max), @BaseDatos VARCHAR(100), @tbAudit VARCHAR(300);
	SELECT @BaseDatos = BaseDatos FROM gth_portal_configuracion;
	SET @tbAudit = QUOTENAME(@serv_vinculado) + '.' + QUOTENAME(RTRIM(@BaseDatos)) + '.dbo.Auditoria';
	SET @cadSQL02 = N'
	SELECT cod_usuario, COUNT(*) as consultas 
	FROM '+@tbAudit+' 
	WHERE modulo = '''+@modulo+''' 
		AND DATEPART(yy,fecha) = '+ CAST(@ano AS VARCHAR(4)) +' 
		AND DATEPART(mm,fecha) = '+ CAST(@mes AS VARCHAR(4)) +' 
		AND cod_usuario IN (SELECT login_portal FROM #tmpEmpls2) 
	GROUP BY cod_usuario 
	ORDER BY 1';

	CREATE TABLE #tmpAudit2 ( cod_usuario CHAR(30) COLLATE DATABASE_DEFAULT, consultas INT );
	INSERT INTO #tmpAudit2 
	EXEC(@cadSQL02);
	
	
	-- Tabla final
	SELECT emp.cod_emp, emp.nombres, aud.consultas 
	FROM #tmpAudit2 aud 
		INNER JOIN #tmpEmpls2 emp ON aud.cod_usuario=emp.login_portal 
	ORDER BY 1;

END

```
