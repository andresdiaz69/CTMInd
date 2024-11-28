# Stored Procedure: sp_gth_DocumentosAnexosEmpleado

## Usa los objetos:
- [[Fn_rhh_NombreCompleto]]
- [[rhh_anexosemplea]]
- [[rhh_docume]]
- [[rhh_emplea]]
- [[rhh_tbsolicdoc]]

```sql

-- =============================================
-- Author:		Grace Niño
-- Create date: 05/03/2023
-- Description:	Procedimiento que recibe los datos de los documentos anexos para el empleado.
-- =============================================

CREATE PROCEDURE [dbo].[sp_gth_DocumentosAnexosEmpleado]
	@IndFun			INT, /*1 - Consulta, 2 - Inserción, 3 - Actualización y 4 - Eliminación*/
	@IndCons		INT, /*1 - Lista de Documentos, 2 - Documento y 3 - Buscar*/
	@cod_emp		CHAR(12), /*Código del Empleado*/
	@cons			INT, /*Consecutivo*/
	@cod_doc		CHAR(4), /*Código Documento*/
	@usu_emp		SYSNAME, /*Usuario Logeado*/
	@DtDocumentos	XML /*Tabla de Documentos*/
	
--WITH ENCRYPTION
AS
BEGIN
	SET NOCOUNT ON;
	SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;

	DECLARE @idocDocumento	INT;
	DECLARE @strMensaje		VARCHAR(MAX);

	DECLARE @Documentos	TABLE 
	(
		cons		INT,
		cod_doc		CHAR(4) COLLATE DATABASE_DEFAULT,
		nom_doc		CHAR(100) COLLATE DATABASE_DEFAULT,
		ind_cum		BIT,
		num_doc		CHAR(20) COLLATE DATABASE_DEFAULT,
		tipo		TINYINT,
		des_tipo	CHAR(20) COLLATE DATABASE_DEFAULT,
		fec_expe	DATETIME,
		fec_comp	DATETIME,
		fec_ent		DATETIME,
		fec_vencto	DATETIME,
		observacion	NVARCHAR(MAX) COLLATE DATABASE_DEFAULT,
		ind_portal	BIT,
		ind_adj		BIT
	);

	EXEC sp_xml_preparedocument @idocDocumento OUTPUT, @DtDocumentos;

	INSERT 
	INTO	@Documentos (cons, cod_doc, nom_doc, ind_cum, num_doc, tipo, des_tipo, fec_expe, fec_comp, fec_ent, fec_vencto, observacion, ind_portal, ind_adj)
	SELECT	cons, cod_doc, nom_doc, ind_cum, num_doc, tipo, des_tipo, fec_expe, fec_comp, fec_ent, fec_vencto, observacion, ind_portal, ind_adj
	FROM	OPENXML (@idocDocumento, '/ROOT/DocumentosEmpleado', 1) WITH(cons		INT,
			cod_doc		CHAR(4) COLLATE DATABASE_DEFAULT,
			nom_doc		CHAR(100) COLLATE DATABASE_DEFAULT,
			ind_cum		BIT,
			num_doc		CHAR(20) COLLATE DATABASE_DEFAULT,
			tipo		TINYINT,
			des_tipo	CHAR(20) COLLATE DATABASE_DEFAULT,
			fec_expe	DATETIME,
			fec_comp	DATETIME,
			fec_ent		DATETIME,
			fec_vencto	DATETIME,
			observacion	NVARCHAR(MAX) COLLATE DATABASE_DEFAULT,
			ind_portal	BIT,
			ind_adj		BIT);

	BEGIN TRY
		BEGIN TRANSACTION
			/*CONSULTAS*/
			IF @IndFun = 1
			BEGIN
				IF @IndCons = 1
				BEGIN
					SELECT	DE.conse_anx AS cons, DE.cod_doc, D.nom_doc, DE.ind_cum, DE.num_doc, DE.tipo, T.descripcion AS des_tipo, DE.fec_expe, DE.fec_comp, DE.fec_ent, DE.fec_vencto, DE.observacion, DE.ind_port_empl AS ind_portal,
							CASE
								WHEN DE.doc_anx IS NOT NULL THEN 1
								ELSE 0
							END AS ind_adj
					FROM	rhh_anexosemplea AS DE
					INNER	JOIN rhh_docume AS D ON DE.cod_doc = D.cod_doc
					INNER	JOIN rhh_tbsolicdoc AS T ON DE.tipo = T.tipo
					WHERE	DE.cod_emp = RTRIM(@cod_emp);
				END
				IF @IndCons = 2
				BEGIN
					SELECT	DE.conse_anx AS cons, DE.cod_doc, D.nom_doc, DE.ind_cum, DE.num_doc, DE.tipo, T.descripcion AS des_tipo, DE.fec_expe, DE.fec_comp, DE.fec_ent, DE.fec_vencto, DE.observacion, DE.ind_port_empl AS ind_portal
					FROM	rhh_anexosemplea AS DE
					INNER	JOIN rhh_docume AS D ON DE.cod_doc = D.cod_doc
					INNER	JOIN rhh_tbsolicdoc AS T ON DE.tipo = T.tipo
					WHERE	DE.cod_emp = RTRIM(@cod_emp) AND DE.conse_anx = @cons
							AND DE.cod_doc = RTRIM(@cod_doc);
				END
				IF @IndCons = 3
				BEGIN
					SELECT	cod_emp, dbo.Fn_rhh_NombreCompleto(cod_emp, 2) AS nom_emp
					FROM	rhh_emplea;
				END
			END

			/*INSERCIÓN*/
			IF @IndFun = 2
			BEGIN
				IF @IndCons = 2
				BEGIN
					INSERT
					INTO	rhh_anexosemplea (cod_emp, cod_doc, ind_cum, num_doc, tipo, fec_expe, fec_comp, fec_ent, fec_vencto, observacion, ind_port_empl, usuario)
 					SELECT	@cod_emp, cod_doc, ind_cum, num_doc, tipo, iif(fec_expe = '19000101', NULL, fec_expe), iif(fec_comp = '19000101', NULL, fec_comp),
							iif(fec_ent = '19000101', NULL, fec_ent), iif(fec_vencto = '19000101', NULL, fec_vencto), ISNULL(observacion,''), ind_portal, @usu_emp
					FROM	@Documentos;

					SELECT @@IDENTITY AS Cons;
				END
			END
	
			/*ACTUALIZACIÓN*/
			IF @IndFun = 3
			BEGIN
				IF @IndCons = 2
				BEGIN
					SELECT	@strMensaje = IIF(DE.ind_cum != D.ind_cum, 'Indicador Cumplimiento Anterior: ' + IIF(DE.ind_cum = 0, 'No', 'Sí') + ', Indicador Cumplimiento Actual: ' + IIF(D.ind_cum = 0, 'No', 'Sí') + ',', '') +
							IIF(DE.num_doc != D.num_doc, 'No. Documento Anterior: ' + RTRIM(DE.num_doc) + ', No. Documento Actual: ' + RTRIM(D.num_doc) + ',', '') +
							IIF(DE.tipo != D.tipo, 'Tipo Solicitud de Documento Anterior: ' + RTRIM(CONVERT(CHAR, DE.tipo)) + ', Tipo Solicitud de Documento Actual: ' + RTRIM(CONVERT(CHAR, D.tipo)) + ',', '') +
							IIF(DE.fec_expe != iif(D.fec_expe = '19000101', NULL, D.fec_expe), 'Fecha de Expedición Anterior: ' + RTRIM(CONVERT(VARCHAR, DE.fec_expe, 103)) + ', Fecha de Expedición Actual: ' + iif(D.fec_expe = '19000101', 'NULL', RTRIM(CONVERT(VARCHAR, D.fec_expe, 103))) + ',', '') +
							IIF(DE.fec_comp != iif(D.fec_comp = '19000101', NULL, D.fec_comp), 'Fecha de Compromiso Anterior: ' + RTRIM(CONVERT(VARCHAR, DE.fec_comp, 103)) + ', Fecha de Compromiso Actual: ' + iif(D.fec_comp = '19000101', 'NULL', RTRIM(CONVERT(VARCHAR, D.fec_comp, 103))) + ',', '') +
							IIF(DE.fec_ent != iif(D.fec_ent = '19000101', NULL, D.fec_ent), 'Fecha de Entrega Anterior: ' + RTRIM(CONVERT(VARCHAR, DE.fec_ent, 103)) + ', Fecha de Entrega Actual: ' + iif(D.fec_ent = '19000101', 'NULL', RTRIM(CONVERT(VARCHAR, D.fec_ent, 103))) + ',', '') +
							IIF(DE.fec_vencto != iif(D.fec_vencto = '19000101', NULL, D.fec_vencto), 'Fecha de Vencimiento Anterior: ' + RTRIM(CONVERT(VARCHAR, DE.fec_vencto, 103)) + ', Fecha de Vencimiento Actual: ' + iif(D.fec_vencto = '19000101', 'NULL', RTRIM(CONVERT(VARCHAR, D.fec_vencto, 103))) + ',', '') +
							IIF(DE.ind_port_empl != D.ind_portal, 'Indicador Visualizar Documento en el Portal Anterior: ' + IIF(DE.ind_port_empl = 0, 'No', 'Sí') + ', Indicador Visualizar Documento en el Portal Actual: ' + IIF(D.ind_portal = 0, 'No', 'Sí') + ',', '') +
							IIF(DE.observacion != D.observacion, 'Observaciones Anteriores: ' + RTRIM(DE.observacion) + ', Observaciones Actuales: ' + RTRIM(D.observacion) + ',', '')
					FROM	rhh_anexosemplea AS DE
					INNER	JOIN @Documentos AS D ON DE.cod_doc = D.cod_doc
							AND DE.conse_anx = D.cons
					WHERE	DE.cod_emp = RTRIM(@cod_emp) AND DE.cod_doc = RTRIM(@cod_doc)
							AND DE.conse_anx = @cons;

					UPDATE	rhh_anexosemplea
					SET		ind_cum = D.ind_cum,
							num_doc = D.num_doc,
							tipo = D.tipo,
							fec_expe = iif(D.fec_expe = '19000101', NULL, D.fec_expe),
							fec_comp = iif(D.fec_comp = '19000101', NULL, D.fec_comp),
							fec_ent = iif(D.fec_ent = '19000101', NULL, D.fec_ent),
							fec_vencto = iif(D.fec_vencto = '19000101', NULL, D.fec_vencto),
							observacion = D.observacion,
							ind_port_empl = D.ind_portal
					FROM	rhh_anexosemplea AS DE
					INNER	JOIN @Documentos AS D ON DE.cod_doc = D.cod_doc
							AND DE.conse_anx = D.cons
					WHERE	DE.cod_emp = RTRIM(@cod_emp) AND DE.cod_doc = RTRIM(@cod_doc)
							AND DE.conse_anx = @cons;

					SELECT @strMensaje AS MensajeAuditoria;
				END
			END

			/*BORRADO*/
			IF @IndFun = 4
			BEGIN
				IF @IndCons = 2
				BEGIN
					DELETE	rhh_anexosemplea
					WHERE	cod_emp = RTRIM(@cod_emp) AND cod_doc = RTRIM(@cod_doc)
							AND conse_anx = @cons;
				END
			END

			EXEC sp_xml_removedocument @idocDocumento;
			
		COMMIT TRANSACTION
	END TRY
	BEGIN CATCH
		WHILE @@TRANCOUNT > 0
		BEGIN
			ROLLBACK TRANSACTION;
		END;

		THROW
	END CATCH 
END

```
