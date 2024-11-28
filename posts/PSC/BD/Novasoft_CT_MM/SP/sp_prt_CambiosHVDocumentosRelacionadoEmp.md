# Stored Procedure: sp_prt_CambiosHVDocumentosRelacionadoEmp

## Usa los objetos:
- [[gth_portal_configuracion]]

```sql






-- =============================================
-- Author: Jessy Tatiana Peralta Florez	
-- Create date: 11-04-2023
-- Description: Se tiene las mismas opciones SP_gth_cambios_Empleados_DocAnexos
--				Se obtiene los documentos que se modificaron, las autorizaciones y los rechazos


-- =============================================
--exec [sp_prt_CambiosHVDocumentosRelacionadoEmp] '1018465875', 5,'ConsultaPorEmpleado',''

CREATE PROCEDURE [dbo].[sp_prt_CambiosHVDocumentosRelacionadoEmp]
	@cod_emp	CHAR(12) = NULL,
	@conse_anx	INT = 0 , 
	@opcion		CHAR(30),	
	@motivo		VARCHAR(500) = NULL
	--,@bd_portal	SYSNAME 
	
--WITH ENCRYPTION
AS
BEGIN
	
	DECLARE @CADENA NVARCHAR(MAX)

	--*****************************************
		--Se agrega la opción para manejo de servidor vinculado
		--Permite realizar consultas entre 2 bases en
		--diferentes servidores

		DECLARE @Serv		VARCHAR(50)= NULL
		DECLARE @BD			VARCHAR(50)= NULL
		DECLARE @ServBD		VARCHAR(100)= NULL

		SELECT @Serv = Servidor,@BD = BaseDatos FROM gth_portal_configuracion
		
		
		SET @ServBD = QUOTENAME(@Serv) +'.'+QUOTENAME(@BD)+'.[dbo].'
		--*****************************************

	IF (@opcion = 'ConsultaPorEmpleado') /* consulta los registros pendientes por autorizar o rechazar */
	BEGIN
		SET @CADENA = ' SELECT	A.cod_emp
								,A.conse_anx
								,RTRIM(B.nom_emp) + ' + 
									CHAR(39) + ' ' + 
									CHAR(39) + ' + RTRIM(B.ap1_emp) + ' + 
									CHAR(39) + ' ' + 
									CHAR(39) + ' + RTRIM(B.ap2_emp) AS nom_emp
								,A.nom_anx 
								,A.descrip
								,IIF(C.conse_anx IS NULL,''Nuevo'',''Modificación'') as TipoCambio
							FROM '+ @ServBD + 'prt_DocRelacionadosEmpTemp A
								INNER JOIN rhh_emplea B ON B.cod_emp = A.cod_emp COLLATE DATABASE_DEFAULT 
								LEFT JOIN rhh_anexosemplea C ON A.cod_emp = C.cod_emp COLLATE DATABASE_DEFAULT    
															AND A.conse_anx = C.conse_anx
							WHERE A.cod_emp = ' + CHAR(39) + @cod_emp + CHAR(39)
							--'
		--print @CADENA
		EXEC(@CADENA)

	END
	ELSE IF (@opcion = 'DescargaDocumento') /* consulta el documento para descargarlo */
	BEGIN

		SET @CADENA = ' SELECT	A.cod_emp
								,A.conse_anx
								,A.nom_anx 
								,doc_anx
								
							FROM '+ @ServBD + 'prt_DocRelacionadosEmpTemp A
							WHERE A.cod_emp = ' + CHAR(39) + @cod_emp + CHAR(39)+' and A.conse_anx = '+ convert(varchar(30),@conse_anx)
							--'
		--select @CADENA
		EXEC(@CADENA)

	END
	ELSE IF (@opcion = 'AutorizaDocuRelacionado') /* Modifica e inserta los documentos */
	BEGIN
		SET @CADENA = ' IF EXISTS (SELECT cod_emp,conse_anx 
									FROM rhh_anexosemplea A 
									WHERE A.cod_emp=' +CHAR(39) +  @cod_emp + CHAR(39) + ' AND A.conse_anx = '  +  convert(varchar(30),@conse_anx) + ')
						BEGIN
							UPDATE A 
							SET A.fecha_anx=B.fecha_anx 
								,A.ind_port_empl=''1''
								,A.descrip = B.descrip
								,A.nom_anx = B.nom_anx
								,A.cod_doc = B.cod_doc 
								,A.tipo = B.tipo
							FROM rhh_anexosemplea A, ' + @ServBD + 'prt_DocRelacionadosEmpTemp B
							WHERE A.cod_emp = '+ CHAR(39) + @cod_emp  + CHAR(39) + ' AND B.cod_emp = ' + CHAR(39) + @cod_emp + CHAR(39) + ' 
								AND A.conse_anx = '  +  convert(varchar(30),@conse_anx) + ' AND B.conse_anx = '  +  convert(varchar(30),@conse_anx)+'

							DELETE FROM ' + @ServBD + 'prt_DocRelacionadosEmpTemp 
							WHERE cod_emp = '+ CHAR(39) + @cod_emp + CHAR(39) + ' AND conse_anx = '  +  convert(varchar(30),@conse_anx)+'
						END
						ELSE
						BEGIN
							INSERT INTO rhh_anexosemplea(cod_emp, fecha_anx,descrip,nom_anx,doc_anx,ind_port_empl,cod_doc,tipo)
							SELECT cod_emp, fecha_anx,descrip,nom_anx,doc_anx,''1'',cod_doc,tipo
								FROM ' + @ServBD + 'prt_DocRelacionadosEmpTemp B
								WHERE B.cod_emp = ' + CHAR(39) + @cod_emp + CHAR(39) + ' AND B.conse_anx = '  +  convert(varchar(30),@conse_anx) +'

							DELETE FROM ' + @ServBD + 'prt_DocRelacionadosEmpTemp 
							WHERE cod_emp = '+ CHAR(39) + @cod_emp + CHAR(39) + ' AND conse_anx = '  +  convert(varchar(30),@conse_anx)+'

						END
					'
		--print @CADENA
		EXEC(@CADENA)
		
	END

	ELSE IF (@opcion = 'RechazaDocuRelacionado') /* Modifica e inserta los documentos */
	BEGIN
		SET @CADENA = ' DELETE FROM ' + @ServBD + 'prt_DocRelacionadosEmpTemp 
						WHERE cod_emp = ' + CHAR(39) + @cod_emp + CHAR(39) + ' AND conse_anx = ' +  convert(varchar(30),@conse_anx)+'
					
						INSERT INTO gth_portal_hdvempleado_rechazos (cod_emp, cod_sec, motivo,Estado,campo) 
						VALUES ( ' + CHAR(39) + @cod_emp + CHAR(39) + ', ''Documentos'', ' + CHAR(39) + @motivo + CHAR(39) + ',' + CHAR(39) + 'Rechazado' + CHAR(39) + ',' + CHAR(39) + 'Nuevo - Registro completo' + CHAR(39) + ' ) 
					'
		
		--print @CADENA
		EXEC(@CADENA)

	END

	
END

```
