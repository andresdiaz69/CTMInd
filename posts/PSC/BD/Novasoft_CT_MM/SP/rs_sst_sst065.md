# Stored Procedure: rs_sst_sst065

## Usa los objetos:
- [[gen_compania]]
- [[rhh_emplea]]
- [[SST_MatrizLegalCue]]
- [[SST_MatrizLegalEnc]]
- [[SST_Normas]]
- [[SST_TipoNorma]]
- [[V_SST_Evidencia]]

```sql

-- =============================================
-- Author:		ANDREA VELEZ
-- Create date: MAYO / 2018
-- Description:	MATRIZ LEGAL
-- =============================================

CREATE PROCEDURE[dbo].[rs_sst_sst065]
	
	@cia		CHAR(3),
	@version	VARCHAR(10)

--WITH ENCRYPTION  	
AS
BEGIN
	DECLARE	@Matriz TABLE 
	(
	cod_cia			CHAR(3),
	nom_cia			VARCHAR(200),
	version			VARCHAR(10),
	titulo			VARCHAR(200),
	fec_crea		DATE,
	fec_act			DATE,
	resp_act		CHAR(12),
	nom_act			VARCHAR(100),
	cod_norma		CHAR(10),
	des_norma		VARCHAR(MAX),
	anio			CHAR(4), 
	entidad			VARCHAR(MAX), 
	art_aplica		VARCHAR(500), 
	des_req			VARCHAR(MAX), 
	evi_cump		VARCHAR(MAX), 
	resp_cump		VARCHAR(500), 
	evi_act			TINYINT, 
	Descripcion		VARCHAR(9), 
	observacion		VARCHAR(MAX), 
	TipoNorma		VARCHAR(50),
	Obsoleta		BIT,
	por_avance		DECIMAL(5,2),
	prom_avance		DECIMAL(5,2),
	Grupo			VARCHAR(MAX),
	nreg			INT IDENTITY(1,1)
	)
	DECLARE
	@totprom		MONEY,
	@nn				INT


	--[rs_sst_sst065] '01','2'
	SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
	SET NOCOUNT ON;
	
	INSERT INTO	@Matriz
	(cod_cia,nom_cia,version,titulo,fec_crea,fec_act,resp_act,nom_act,
	cod_norma,des_norma,anio,entidad,art_aplica,des_req,evi_cump,resp_cump, 
	evi_act,Descripcion,observacion,TipoNorma,Obsoleta,por_avance,prom_avance)
	SELECT ME.cod_cia, C.nom_cia, ME.version, ME.titulo, ME.fec_crea, ME.fec_act, ME.resp_act,
	RTRIM(E.nom_emp)+SPACE(1)+RTRIM(E.ap1_emp)+SPACE(1)+RTRIM(E.ap2_emp) AS nom_act,
	MC.cod_norma, N.des_norma, N.anio, N.entidad, MC.art_aplica, MC.des_req,
	MC.evi_cump, MC.resp_cump, MC.evi_act, EV.Descripcion, MC.observacion,TN.nom_tipnorma AS TipoNorma,
	n.ley_obsoleta AS Obsoleta,ISNULL(MC.por_avance,0),CAST(0 AS DECIMAL(5,2)) AS prom_avance
	FROM SST_MatrizLegalEnc AS ME
	INNER	JOIN gen_compania AS C ON ME.cod_cia = C.cod_cia
	LEFT	JOIN rhh_emplea AS E ON ME.resp_act =E.cod_emp
	LEFT	JOIN SST_MatrizLegalCue AS MC ON ME.cod_cia = MC.cod_cia AND ME.version = MC.version
	LEFT	JOIN SST_Normas AS N ON MC.cod_norma = N.cod_norma
	LEFT	JOIN V_SST_Evidencia AS EV ON MC.evi_act = EV.cod
	INNER JOIN SST_TipoNorma TN ON N.cod_tipnorma = TN.cod_tipnorma
	--INNER JOIN rhh_emplea EM ON ME.cod_elab_por = EM.cod_emp
	WHERE ME.cod_cia LIKE RTRIM(@cia)
		AND ME.version LIKE RTRIM(@version)

	SELECT @totprom = ISNULL(SUM(por_avance),0) FROM @Matriz
	SELECT @nn = ISNULL(MAX(nreg),1) FROM @Matriz
	
	UPDATE @Matriz SET prom_avance = @totprom/@nn

	UPDATE @Matriz SET Grupo =
	'Tipo Norma: ' + RTRIM(cod_norma) + '- ' + RTRIM(des_norma) + CHAR(13) + CHAR(10) +
	'Año de Emisión: ' + RTRIM(Anio) + CHAR(13) + CHAR(10) +
	'Disposición que Regula: ' + RTRIM(entidad)

	SELECT cod_cia,nom_cia,version,titulo,fec_crea,fec_act,resp_act,nom_act,
	cod_norma,des_norma,anio,entidad,art_aplica,des_req,evi_cump,resp_cump, 
	evi_act,Descripcion,observacion,TipoNorma,Obsoleta,por_avance,prom_avance,Grupo
	FROM @Matriz ORDER BY cod_norma,anio,entidad,art_aplica
END

```
