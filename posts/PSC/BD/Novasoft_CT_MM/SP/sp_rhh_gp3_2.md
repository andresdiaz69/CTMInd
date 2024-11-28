# Stored Procedure: sp_rhh_gp3_2

## Usa los objetos:
- [[rhh_dis_con]]
- [[rhh_dis_emp]]
- [[rhh_liqhis]]
- [[rhh_pertlq]]
- [[sp_rhh_gp1_0]]
- [[sp_rhh_gp1_3]]
- [[v_rhh_concep]]

```sql

-- 2021/03/03 SPA2021-0089 => SNR2021-0050 Homologación
CREATE PROCEDURE [dbo].[sp_rhh_gp3_2]
	@fec_liq 	DATETIME,
	@tip_liq 	CHAR(2),
	@nit_ter	CHAR(15),
	@cod_emp	CHAR(12),
	@ano_gp		CHAR(4),
	@per_gp		CHAR(2),
	@idl_num	BIGINT,
	@det_doc	VARCHAR(250),
	@gp_new		CHAR(14) OUTPUT 
AS
BEGIN

	DECLARE	@val_gp		MONEY;

    DECLARE @por_dis	DECIMAL(5,2),
			@rubro		CHAR(17),
			@cod_cco	CHAR(6),
			@cod_cl1	VARCHAR(12),
			@cod_cl2	VARCHAR(12),
			@cod_cl3	VARCHAR(12),
			@cod_cl4	VARCHAR(12),
			@cod_cl5	VARCHAR(12),
			@cod_cl6	VARCHAR(12),
			@cod_cl7	VARCHAR(12);

	DECLARE	@ind_pre	TINYINT,
			@tip_int	TINYINT;;

	BEGIN TRY

		SET NOCOUNT ON;
		SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;

		SET @ind_pre = 2;
		SET @tip_int = 3;

		IF OBJECT_ID('tempdb..#T_rhh_DisEstruc') IS NOT NULL
		BEGIN
			DROP TABLE #T_rhh_DisEstruc;
		END;

		--SELECT 'sp_rhh_gp3_2'  AS sp_rhh_gp3_2

		SELECT H.cod_con, H.mod_liq, A.cod_emp,D.cod_dis, D.cod_cia, D.cod_suc, D.cod_cco, D.cod_cl1, D.cod_cl2, 
				D.cod_cl3, D.cod_rub, D.por_dis 
		INTO	#T_rhh_DisEstruc
		FROM	rhh_liqhis h 
			INNER JOIN v_rhh_concep c	ON h.cod_con=c.cod_con  and h.mod_liq=c.mod_liq 
			INNER JOIN rhh_pertlq p		ON h.ano_liq=p.ano_tlq and h.per_liq = p.per_tlq 
			INNER JOIN rhh_dis_emp a	ON h.cod_emp = a.cod_emp 
			INNER JOIN rhh_dis_con d	ON d.cod_dis = a.cod_dis
		WHERE H.cod_emp=@cod_emp 
			AND h.fec_liq = @fec_liq 
			AND h.tip_liq = @tip_liq 
			AND p.cod_tlq = 2  
			AND C.ind_pre = @tip_int 
			AND h.sec_con NOT LIKE '%UN[_0-9][0-9]%' 
			AND	a.fec_apl =	(SELECT MAX(fec_apl) FROM rhh_dis_emp WHERE fec_apl <= @fec_liq   AND cod_emp=a.cod_emp)
			AND C.ter_deb = @nit_ter
			AND h.IDL_num = @idl_num
		GROUP BY H.cod_con, H.mod_liq, A.cod_emp,D.cod_dis, D.cod_cia, D.cod_suc, D.cod_cco, D.cod_cl1, D.cod_cl2, 
			D.cod_cl3, D.cod_rub, D.por_dis; 

		-- validación saldo por estructura de costos de documentos asociados al empleado
		EXEC sp_rhh_gp1_0 @fec_liq,
						@tip_liq,
						@cod_emp,
						@idl_num,
						1,
						@tip_int,
						@nit_ter;

		DECLARE c_int_rhh3 CURSOR FOR
		SELECT	A.cod_rub,A.cod_cco,A.cod_cl1, A.cod_cl2, A.cod_cl3, A.por_dis,SUM(H.val_liq)
		FROM	rhh_liqhis H
		INNER	JOIN #T_rhh_DisEstruc A ON A.cod_emp = H.cod_emp 
				AND h.cod_con = a.cod_con  
				AND h.mod_liq = a.mod_liq
		WHERE	h.cod_emp =@cod_emp 
			AND h.fec_liq =@fec_liq 
			AND h.tip_liq =@tip_liq 
			AND H.IDL_num = @idl_num
		GROUP BY A.cod_rub, A.cod_cco,A.cod_cl1, A.cod_cl2, A.cod_cl3, A.por_dis 
		ORDER BY A.cod_rub, A.cod_cco,A.cod_cl1, A.cod_cl2, A.cod_cl3; 

		OPEN c_int_rhh3
		FETCH NEXT FROM c_int_rhh3 
		INTO @rubro,@cod_cco,@cod_cl1,@cod_cl2,@cod_cl3,@por_dis,@val_gp
		WHILE @@FETCH_STATUS <> -1
		BEGIN
			SET @val_gp = (@val_gp * @por_dis) / 100;

			EXEC sp_rhh_gp1_3 	@fec_liq,
								@tip_liq,
								@cod_emp,
								@ano_gp,
								@per_gp,
								@rubro,
								@cod_cco,
								@cod_cl1,
								@cod_cl2,
								@cod_cl3,
								@cod_cl4,
								@cod_cl5,
								@cod_cl6,
								@cod_cl7,
								@val_gp,
								@det_doc,
								@gp_new OUTPUT,
								@tip_int,
								@nit_ter,
								@idl_num,
								@ind_pre;

			FETCH NEXT FROM c_int_rhh3 
			INTO @rubro, @cod_cco, @cod_cl1, @cod_cl2, @cod_cl3,@por_dis,@val_gp;
		END;
		CLOSE c_int_rhh3;
		DEALLOCATE c_int_rhh3;

    END TRY

    BEGIN CATCH

	   IF CURSOR_STATUS('global', 'c_int_rhh3') >= 0
	   BEGIN
		  CLOSE c_int_rhh3;
		  DEALLOCATE c_int_rhh3;
	   END;

	   IF CURSOR_STATUS('global', 'c_int_rhh3') = -1
	   BEGIN
		  DEALLOCATE c_int_rhh3;
	   END;

	   THROW;
    END CATCH;
END


```
