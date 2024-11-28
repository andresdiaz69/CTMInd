# Stored Procedure: sp_gth_InfoDocumentosContratoCandidato

## Usa los objetos:
- [[GTH_CitaContrato]]
- [[GTH_RptDocemp]]
- [[rhh_docume]]
- [[v_GTH_EmplCand]]
- [[v_GTH_SolCargos]]

```sql

-- =============================================
-- Author:		Grace Niño
-- Create date: 04/03/2023
-- Description:	Procedimiento que recibe los datos de los documentos para contratar el candidato.
-- =============================================

CREATE PROCEDURE [dbo].[sp_gth_InfoDocumentosContratoCandidato]
	@IndFun			INT, /*1 - Consulta, 2 - Inserción, 3 - Actualización y 4 - Eliminación*/
	@IndCons		INT, /*1 - Citación, 2 - Documentos y 3 - Buscar*/
	@num_req		INT, /*Solicitud de Personal*/
	@cod_emp		CHAR(12), /*Código del Candidato*/
	@fec_cont		DATETIME, /*Fecha de Contratación*/
	@ind_asist		BIT, /*Indicador de Asistencia*/
	@observacion	NVARCHAR(MAX), /*Observaciones*/
	@cod_doc		CHAR(4), /*Código Documento*/
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
		cod_doc		CHAR(4) COLLATE DATABASE_DEFAULT,
		nom_doc		CHAR(100) COLLATE DATABASE_DEFAULT,
		ind_cum		BIT,
		num_doc		CHAR(20) COLLATE DATABASE_DEFAULT,
		fec_expe	DATETIME,
		fec_comp	DATETIME,
		fec_ent		DATETIME,
		fec_vencto	DATETIME,
		observacion	NVARCHAR(MAX) COLLATE DATABASE_DEFAULT,
		ind_adj		INT
	);

	EXEC sp_xml_preparedocument @idocDocumento OUTPUT, @DtDocumentos;

	INSERT 
	INTO	@Documentos (cod_doc, nom_doc, ind_cum, num_doc, fec_expe, fec_comp, fec_ent, fec_vencto, observacion, ind_adj)
	SELECT	cod_doc, nom_doc, ind_cum, num_doc, fec_expe, fec_comp, fec_ent, fec_vencto, observacion, ind_adj
	FROM	OPENXML (@idocDocumento, '/ROOT/DocumentosContratar', 1) WITH(cod_doc		CHAR(4) COLLATE DATABASE_DEFAULT,
			nom_doc		CHAR(100) COLLATE DATABASE_DEFAULT,
			ind_cum		BIT,
			num_doc		CHAR(20) COLLATE DATABASE_DEFAULT,
			fec_expe	DATETIME,
			fec_comp	DATETIME,
			fec_ent		DATETIME,
			fec_vencto	DATETIME,
			observacion	NVARCHAR(MAX) COLLATE DATABASE_DEFAULT,
			ind_adj		INT);

	BEGIN TRY
		BEGIN TRANSACTION
			/*CONSULTAS*/
			IF @IndFun = 1
			BEGIN
				IF @IndCons = 1
				BEGIN
					SELECT	num_req, cod_emp, fec_con, ISNULL(ind_asist, 0) AS ind_asist, observacion 
					FROM	GTH_CitaContrato
					WHERE	num_req = @num_req AND cod_emp = RTRIM(@cod_emp);
				END
				IF @IndCons = 2
				BEGIN
					SELECT	DE.cod_doc, D.nom_doc, ISNULL(DE.ind_cum, 0) AS ind_cum, DE.num_doc, DE.fec_expe, DE.fec_comp, DE.fec_ent, DE.fec_vencto, DE.observacion, 
							CASE
								WHEN DE.doc_anx IS NOT NULL THEN 1
								ELSE 0
							END AS ind_adj
					FROM	GTH_RptDocemp AS DE
					INNER	JOIN rhh_docume AS D ON DE.cod_doc = D.cod_doc
					WHERE	DE.num_req = @num_req AND DE.cod_emp = RTRIM(@cod_emp);
				END
				IF @IndCons = 3
				BEGIN
					SELECT	C.num_req, S.nom_car, C.cod_emp, E.NOM_EMP AS nom_emp, C.fec_con, ISNULL(C.ind_asist,0) AS ind_asist
					FROM	GTH_CitaContrato AS C
					INNER	JOIN v_GTH_SolCargos AS S ON C.num_req = S.num_req
					INNER	JOIN v_GTH_EmplCand AS E ON C.cod_emp = E.cod_emp;
				END
				IF @IndCons = 4
				BEGIN
					SELECT	DE.cod_doc, D.nom_doc, ISNULL(DE.ind_cum, 0) AS ind_cum, DE.num_doc, DE.fec_expe, DE.fec_comp, DE.fec_ent, DE.fec_vencto, DE.observacion
					FROM	GTH_RptDocemp AS DE
					INNER	JOIN rhh_docume AS D ON DE.cod_doc = D.cod_doc
					WHERE	DE.num_req = @num_req AND DE.cod_emp = RTRIM(@cod_emp) AND DE.cod_doc = RTRIM(@cod_doc);
				END
			END

			/*INSERCIÓN*/
			IF @IndFun = 2
			BEGIN
				IF @IndCons = 2
				BEGIN
					INSERT
					INTO	GTH_RptDocemp (num_req, cod_emp, cod_doc, ind_cum, num_doc, tipo, fec_expe, fec_comp, fec_ent, fec_vencto, observacion)
 					SELECT	@num_req, @cod_emp, cod_doc, ind_cum, num_doc, '1', iif(fec_expe = '19000101', NULL, fec_expe), iif(fec_comp = '19000101', NULL, fec_comp),
							iif(fec_ent = '19000101', NULL, fec_ent), iif(fec_vencto = '19000101', NULL, fec_vencto), observacion
					FROM	@Documentos;
				END
			END
	
			/*ACTUALIZACIÓN*/
			IF @IndFun = 3
			BEGIN
				IF @IndCons = 1
				BEGIN
					SELECT	@strMensaje = IIF(fec_con != @fec_cont, 'Fecha de Contratación Anterior: ' + RTRIM(CONVERT(VARCHAR, fec_con, 103)) + ', Fecha de Contratación Actual: ' + RTRIM(CONVERT(VARCHAR, @fec_cont, 103)) + ',', '') +
							IIF(ind_asist != @ind_asist, 'Indicador Asistencia Anterior: ' + IIF(ind_asist = 0, 'No', 'Sí') + ', Indicador Asistencia Actual: ' + IIF(@ind_asist = 0, 'No', 'Sí') + ',', '') +
							IIF(observacion != @observacion, 'Observaciones Anteriores: ' + RTRIM(observacion) + ', Observaciones Actuales: ' + RTRIM(@observacion) + ',', '')
					FROM	GTH_CitaContrato
					WHERE	num_req = @num_req AND cod_emp = RTRIM(@cod_emp);

					UPDATE	GTH_CitaContrato
					SET		fec_con = @fec_cont,
							ind_asist = @ind_asist,
							observacion = observacion
					WHERE	num_req = @num_req AND cod_emp = RTRIM(@cod_emp);

					SELECT @strMensaje AS MensajeAuditoria;
				END
				IF @IndCons = 2
				BEGIN
					SELECT	@strMensaje = IIF(DE.ind_cum != D.ind_cum, 'Indicadot Cumplimiento Anterior: ' + IIF(DE.ind_cum = 0, 'No', 'Sí') + ', Indicador Cumplimiento Actual: ' + IIF(D.ind_cum = 0, 'No', 'Sí') + ',', '') +
							IIF(DE.num_doc != D.num_doc, 'No. Documento Anterior: ' + RTRIM(DE.num_doc) + ', No. Documento Actual: ' + RTRIM(D.num_doc) + ',', '') +
							IIF(DE.fec_expe != iif(D.fec_expe = '19000101', NULL, D.fec_expe), 'Fecha de Expedición Anterior: ' + RTRIM(CONVERT(VARCHAR, DE.fec_expe, 103)) + ', Fecha de Expedición Actual: ' + iif(D.fec_expe = '19000101', 'NULL', RTRIM(CONVERT(VARCHAR, D.fec_expe, 103))) + ',', '') +
							IIF(DE.fec_comp != iif(D.fec_comp = '19000101', NULL, D.fec_comp), 'Fecha de Compromiso Anterior: ' + RTRIM(CONVERT(VARCHAR, DE.fec_comp, 103)) + ', Fecha de Compromiso Actual: ' + iif(D.fec_comp = '19000101', 'NULL', RTRIM(CONVERT(VARCHAR, D.fec_comp, 103))) + ',', '') +
							IIF(DE.fec_ent != iif(D.fec_ent = '19000101', NULL, D.fec_ent), 'Fecha de Entrega Anterior: ' + RTRIM(CONVERT(VARCHAR, DE.fec_ent, 103)) + ', Fecha de Entrega Actual: ' + iif(D.fec_ent = '19000101', 'NULL', RTRIM(CONVERT(VARCHAR, D.fec_ent, 103))) + ',', '') +
							IIF(DE.fec_vencto != iif(D.fec_vencto = '19000101', NULL, D.fec_vencto), 'Fecha de Vencimiento Anterior: ' + RTRIM(CONVERT(VARCHAR, DE.fec_vencto, 103)) + ', Fecha de Vencimiento Actual: ' + iif(D.fec_vencto = '19000101', 'NULL', RTRIM(CONVERT(VARCHAR, D.fec_vencto, 103))) + ',', '') +
							IIF(DE.observacion != D.observacion, 'Observaciones Anteriores: ' + RTRIM(DE.observacion) + ', Observaciones Actuales: ' + RTRIM(D.observacion) + ',', '')
					FROM	GTH_RptDocemp AS DE
					INNER	JOIN @Documentos AS D ON DE.cod_doc = D.cod_doc
					WHERE	DE.num_req = @num_req AND DE.cod_emp = RTRIM(@cod_emp) AND DE.cod_doc = RTRIM(@cod_doc);

					UPDATE	GTH_RptDocemp
					SET		ind_cum = D.ind_cum,
							num_doc = D.num_doc,
							fec_expe = iif(D.fec_expe = '19000101', NULL, D.fec_expe),
							fec_comp = iif(D.fec_comp = '19000101', NULL, D.fec_comp),
							fec_ent = iif(D.fec_ent = '19000101', NULL, D.fec_ent),
							fec_vencto = iif(D.fec_vencto = '19000101', NULL, D.fec_vencto),
							observacion = D.observacion
					FROM	GTH_RptDocemp AS DE
					INNER	JOIN @Documentos AS D ON DE.cod_doc = D.cod_doc
					WHERE	DE.num_req = @num_req AND DE.cod_emp = RTRIM(@cod_emp) AND DE.cod_doc = RTRIM(@cod_doc);

					SELECT @strMensaje AS MensajeAuditoria;
				END
			END

			/*BORRADO*/
			IF @IndFun = 4
			BEGIN
				IF @IndCons = 2
				BEGIN
					DELETE	GTH_RptDocemp
					WHERE	num_req = @num_req AND cod_emp = RTRIM(@cod_emp) AND cod_doc = RTRIM(@cod_doc);
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
