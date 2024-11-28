# Stored Procedure: SP_gth_cambios_Empleados_DocAnexos

## Usa los objetos:
- [[Server_vinculado]]

```sql






-- =============================================
-- Author: Yeinny Carolina Garzón Urrego	
-- Create date: 16 Jul 2014
-- Description:	Obtiene y autoriza los cambios para la informacion de Documentos Anexos del empleado
-- Modificado por: Alexander Vargas 
-- Fecha modificado: 14 Jul 2015
-- Comentario: Se realizan 2 cambios, se agrega la instrucción END al final de @CADENA para cerrar la condición falsa
-- En el UPDATE se eliminan los campos cod_emp y conse_anx, ya que no se deben actualizar, solo
-- se modifica la fecha y el documento.

-- Modificado por: Alexander Vargas 
-- Fecha modificado: 31 May 2015
-- Comentario: Se agrega código 08 correspondiente a sección y el texto Rechazado para el campo Estado
-- La tabla donde se guardan el estado de cambios se llama gth_portal_hdvempleado_rechazos

-- Modificado por: Alexander Vargas 
-- Fecha modificado: 20 Abr 2016
-- Comentario: Se agrega la opción AR (archivo anexo) para descarga el documento
-- En la opción de consulta se elimina el manejo del archivo (doc_anx)
-- ya que esto provoca que el sitio genero error cuando los archivos son grandes.

-- Modificado por: Alexander Vargas 
-- Fecha modificado: 24 Abr 2018
-- Comentario: Se agrega la opción CE (consulta un empleado) para mostrar los documentos
-- pendientes por autorizar del empleado que se consulta en el formulario
-- autorizacion de cambios HV empleado

-- SRS2021-0387 Error por COLLATE descarga archivo
-- Modificado por: Alexander Vargas 
-- Fecha modificado: 29/04/2021
-- Comentario: en la opcion AR-descarga de adjunto
--				se quita la clausula COLLATE del campo doc_anx
--				porque generó error en el cliente (en el estandar funciona)


-- SNR2022-0079 Mostrar sólo documentos de Portal, 
-- Modificado por: Alexander Vargas 
-- Fecha modificado: 13/05/2022
-- Comentario: se agrega el campo ind_port_empl para que al autorizar
-- el documento se muestre marcado como documento de portal

-- Modificado: 22-06-2022
-- Modificado por: Alexander Vargas
-- Comentario: se modifica el nombre de la sección y se agrega la columna campo 
-- con el valor Nuevo - Registro completo

--SRS2023 - 0011 Tamanio variable server vinculado
--Modified by:		Alexander Vargas
--Modified date:	16/01/2023
--Description:		Se aumenta el tamaño de la variable serv_vinculado a 50 caracteres

-- =============================================
--exec SP_gth_cambios_Empleados_DocAnexos '80032026', 1,'A','', 'Portal_Web_Main'

CREATE PROCEDURE [dbo].[SP_gth_cambios_Empleados_DocAnexos]
	@cod_emp	CHAR(12) = NULL,
	@conse_anx	INT = 0 , 
	@opc		CHAR(2),	--A:Cambio de info Autorizado para cod_emp 
							--N:Cambio de info Negado para cod_emp
							--C:Consultar todos los cambios pendientes
	@motivo		VARCHAR(500) = NULL,
	@bd_portal	SYSNAME 
	
--WITH ENCRYPTION
AS
BEGIN
	
	DECLARE @CADENA NVARCHAR(MAX)

		--*****************************************
	--Se agrega la opción para manejo de servidor vinculado
	--Permite realizar consultas entre 2 bases en
	--diferentes servidores

	DECLARE @serv_vinculado VARCHAR(50)= NULL

	SELECT @serv_vinculado= server FROM Server_vinculado

	IF(@serv_vinculado IS NULL OR @serv_vinculado='' )
	BEGIN
		SET @serv_vinculado=@@SERVERNAME
	END

	--*****************************************


	SET @bd_portal=QUOTENAME(@serv_vinculado) + '.' +   QUOTENAME(@bd_portal)


	
	IF(@opc='A')
	BEGIN
			SET @CADENA = 'IF (EXISTS (SELECT cod_emp,conse_anx FROM rhh_anexosemplea A WHERE A.cod_emp= ' + CHAR(39) +  @cod_emp + CHAR(39) + ' AND A.conse_anx = '  +  convert(varchar(30),@conse_anx) + ')) '
			SET @CADENA = @CADENA + ' BEGIN	UPDATE A SET A.fecha_anx=B.fecha_anx, A.doc_anx = B.doc_anx, A.ind_port_empl=B.ind'
			SET @CADENA = @CADENA + ' FROM rhh_anexosemplea A, ' + @bd_portal + '.dbo.TMP_anexosemplea B '
			SET @CADENA = @CADENA + ' WHERE A.cod_emp = '  + CHAR(39) + @cod_emp  + CHAR(39) + ' AND B.cod_emp = ' + CHAR(39) + @cod_emp + CHAR(39) + ' AND A.conse_anx = '  +  convert(varchar(30),@conse_anx) + ' AND B.conse_anx = '  +  convert(varchar(30),@conse_anx)
			SET @CADENA = @CADENA + ' DELETE FROM ' + @bd_portal + '.dbo.TMP_anexosemplea WHERE cod_emp = '+ CHAR(39) + @cod_emp + CHAR(39) + ' AND conse_anx = '  +  convert(varchar(30),@conse_anx)
			SET @CADENA = @CADENA + ' END '
			SET @CADENA = @CADENA + ' ELSE '
			SET @CADENA = @CADENA + ' BEGIN ' 
			SET @CADENA = @CADENA + ' INSERT INTO rhh_anexosemplea(cod_emp, fecha_anx, doc_anx,descrip,nom_anx,ind_port_empl) '
			SET @CADENA = @CADENA + ' SELECT cod_emp, fecha_anx, doc_anx,descrip,nom_anx,ind '
			SET @CADENA = @CADENA + ' FROM ' + @bd_portal + '.dbo.TMP_anexosemplea B '
			SET @CADENA = @CADENA + ' WHERE B.cod_emp = ' + CHAR(39) + @cod_emp + CHAR(39) + ' AND B.conse_anx = '  +  convert(varchar(30),@conse_anx) 
			SET @CADENA = @CADENA + ' DELETE FROM ' + @bd_portal + '.dbo.TMP_anexosemplea WHERE cod_emp = ' + CHAR(39) + @cod_emp + CHAR(39) + ' AND conse_anx = '  +  convert(varchar(30),@conse_anx) + ' END '
		EXEC(@CADENA)
	END
	ELSE IF (@opc='N')
	BEGIN
	--08 corresponde a al sección Documentos en el Estado de cambios
	--de la hoja de vida en Portal Web
		SET @CADENA = ' DELETE FROM ' + @bd_portal + '.dbo.TMP_anexosemplea WHERE cod_emp = ' + CHAR(39) + @cod_emp + CHAR(39) + ' AND conse_anx = ' +  convert(varchar(30),@conse_anx) 
		SET @CADENA = @CADENA + ' INSERT INTO gth_portal_hdvempleado_rechazos (cod_emp, cod_sec, motivo,Estado,campo) VALUES ( ' + CHAR(39) + @cod_emp + CHAR(39) + ', Documentos, ' + CHAR(39) + @motivo + CHAR(39) + ',' + CHAR(39) + 'Rechazado' + CHAR(39) + ',' + CHAR(39) + 'Nuevo - Registro completo' + CHAR(39) + ' ) '
		
		EXEC(@CADENA)
	END
	ELSE IF (@opc='C')
	BEGIN
		SET @CADENA = ' SELECT A.cod_emp, A.conse_anx, RTRIM(B.nom_emp) + ' + CHAR(39) + ' ' + CHAR(39) + ' + RTRIM(B.ap1_emp) + ' + CHAR(39) + ' ' + CHAR(39) + ' + RTRIM(B.ap2_emp) AS ' + CHAR(39) + 'nom_emp' + CHAR(39) + ' , A.nom_anx, '''' AS doc_anx, A.descrip,  '
		--Campos para comparar con los nuevos
		SET @CADENA = @CADENA + ' C.nom_anx AS ' + CHAR(39) + 'T.nom_anx' + CHAR(39) -- +  ', C.doc_anx AS ' + CHAR(39) + 'T.doc_anx' + CHAR(39) 
		--===================================
		SET @CADENA = @CADENA + ' FROM  '+ @bd_portal + '.dbo.TMP_anexosemplea A '
		SET @CADENA = @CADENA + ' INNER JOIN rhh_emplea B ON B.cod_emp = A.cod_emp COLLATE DATABASE_DEFAULT    '
		SET @CADENA = @CADENA + ' LEFT JOIN rhh_anexosemplea C ON A.cod_emp = C.cod_emp COLLATE DATABASE_DEFAULT    AND A.conse_anx = C.conse_anx '
		print @CADENA
		EXEC(@CADENA)
	END
	ELSE IF(@opc='AR')
	BEGIN
			SET @CADENA = 'SELECT doc_anx from ' + @bd_portal + '.dbo.TMP_anexosemplea WHERE conse_anx=' + convert(varchar(30),@conse_anx)
			PRINT @CADENA
			EXEC(@CADENA)
	END
	ELSE IF (@opc='CE')
	BEGIN
		SET @CADENA = ' SELECT A.cod_emp, A.conse_anx, RTRIM(B.nom_emp) + ' + CHAR(39) + ' ' + CHAR(39) + ' + RTRIM(B.ap1_emp) + ' + CHAR(39) + ' ' + CHAR(39) + ' + RTRIM(B.ap2_emp) AS ' + CHAR(39) + 'nom_emp' + CHAR(39) + ' , A.nom_anx, '''' AS doc_anx, A.descrip,  '
		--Campos para comparar con los nuevos
		SET @CADENA = @CADENA + ' C.nom_anx AS ' + CHAR(39) + 'T.nom_anx' + CHAR(39) -- +  ', C.doc_anx AS ' + CHAR(39) + 'T.doc_anx' + CHAR(39) 
		--===================================
		SET @CADENA = @CADENA + ' FROM  '+ @bd_portal + '.dbo.TMP_anexosemplea A '
		SET @CADENA = @CADENA + ' INNER JOIN rhh_emplea B ON B.cod_emp = A.cod_emp COLLATE DATABASE_DEFAULT    '
		SET @CADENA = @CADENA + ' LEFT JOIN rhh_anexosemplea C ON A.cod_emp = C.cod_emp COLLATE DATABASE_DEFAULT    AND A.conse_anx = C.conse_anx '
		SET @CADENA = @CADENA + ' WHERE A.cod_emp = ' + CHAR(39) + @cod_emp + CHAR(39)
		print @CADENA
		EXEC(@CADENA)
	END

END

```
