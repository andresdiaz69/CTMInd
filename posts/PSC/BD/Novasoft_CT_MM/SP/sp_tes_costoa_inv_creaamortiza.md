# Stored Procedure: sp_tes_costoa_inv_creaamortiza

## Usa los objetos:
- [[tes_amorti_niif]]
- [[tes_cuo_cre]]
- [[tes_inv_cre]]

```sql

/*=============================================
Author:		JOHANNA CAROLINA SARMIENTO
Create date: DICIEMBRE/2015
Description:	PROCEDIMIENTO QUE INSERTA LA INFORMACION DE COSTO AMORTIZADO EN EL MAESTRO CORRESPONDIENTE
				SRS: 2015-1018
=============================================*/
CREATE PROCEDURE [dbo].[sp_tes_costoa_inv_creaamortiza]
	@ano_doc	CHAR(4),
	@per_doc	CHAR(2),
	@sub_tip	CHAR(5),
	@num_doc	CHAR(14),
	@fec_cuo	DATETIME,
	@val_doc	MONEY,
	@plazo		SMALLINT,
	@tasa_mv	DECIMAL(12,8),
	@cta_deb	CHAR(16),
	@cta_cre	CHAR(16),
	@cna_deb	CHAR(16),
	@cna_cre	CHAR(16),
	@ind_cuo	TINYINT		--1: Inversiones, 2: Creditos
AS
BEGIN
	DECLARE @conteo	INT;

	SET NOCOUNT ON;

	SELECT @conteo = COUNT(1)
	FROM tes_amorti_niif
	WHERE num_doc=@num_doc
		AND sub_tip = @sub_tip
		AND per_doc = @per_doc
		AND ano_doc = @ano_doc;

	IF @conteo = 0
	 BEGIN
		RAISERROR ('No hay información a procesar',18,-1);
		RETURN;
	 END;

	INSERT INTO tes_inv_cre (ano_doc,per_doc,sub_tip,num_doc,mon_fin,plazo,fec_pcu,por_int,cos_inc,cta_deb,cta_cre,cna_deb,cna_cre,cta_gas,num_pre,con_cap,ind_int
										,cod_emp)
	VALUES (@ano_doc,@per_doc,@sub_tip,@num_doc,@val_doc,@plazo,@fec_cuo,@tasa_mv,0,@cta_deb, @cta_cre, @cna_deb, @cna_cre,'0','0','0',0
				,'0');

	--	INSERCION CUOTAS INVERSIONES
	IF @ind_cuo = 1
	BEGIN
		INSERT INTO tes_cuo_cre (ano_doc,per_doc,sub_tip,num_doc
											,fec_cuo
											,val_cuo,int_nif,int_rea,dif_int,sal_ini,sal_fin,cod_emp)
		SELECT	ano_doc, per_doc, sub_tip, num_doc
					,DATEADD(MONTH,(periodo-1),@fec_cuo)
					,0,intereses,intereses,0,0,0,'0'
		FROM tes_amorti_niif
		WHERE num_doc=@num_doc
			AND sub_tip = @sub_tip
			AND per_doc = @per_doc
			AND ano_doc = @ano_doc;
	
		IF @@ROWCOUNT > 0
		BEGIN
			SELECT 'Mensaje'='Proceso Terminado.';
		
			DELETE FROM tes_amorti_niif
			WHERE num_doc=@num_doc
				AND sub_tip = @sub_tip
				AND per_doc = @per_doc
				AND ano_doc = @ano_doc;
		END;
	END;

	--	 INSERCION CUOTAS CREDITOS
	IF @ind_cuo = 2
	BEGIN
		INSERT INTO tes_cuo_cre (ano_doc,per_doc,sub_tip,num_doc
											,fec_cuo
											,val_cuo,int_nif,int_rea,dif_int,sal_ini,sal_fin,cod_emp)
		SELECT	ano_doc, per_doc, sub_tip, num_doc
					,DATEADD(MONTH,(periodo-1),@fec_cuo)
					,pago_real,int_tir,int_real,diferencia,sal_ini,sal_fin,'0'
		FROM tes_amorti_niif
		WHERE num_doc=@num_doc
			AND sub_tip = @sub_tip
			AND per_doc = @per_doc
			AND ano_doc = @ano_doc;
	
		IF @@ROWCOUNT > 0
		BEGIN
			SELECT 'Mensaje'='Proceso Terminado.';
		
			DELETE FROM tes_amorti_niif
			WHERE num_doc=@num_doc
				AND sub_tip = @sub_tip
				AND per_doc = @per_doc
				AND ano_doc = @ano_doc;
		END;
	END;
END

```
