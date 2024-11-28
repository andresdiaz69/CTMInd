# Stored Procedure: usr3_sp_rhh_strtipsal

## Usa los objetos:
- [[GTH_ParamContratos]]

```sql

CREATE PROCEDURE [dbo].[usr3_sp_rhh_strtipsal]
	@cCaduno	CHAR(50),-- ctagas empleado
	@fec_cte	datetime,-- fecha corte
	@cod_cont	int, -- codigo contrato
	@cod_emp	CHAR(12), -- codigo empleado
	@cCaddos	CHAR(50),-- cuenta1
	@cCadtres	CHAR(50),-- cuenta 2
	@cCadcuatro CHAR (50)--cuenta 3
--WITH ENCRYPTION
As

DECLARE @cCadena	CHAR(200)
DECLARE @cCadres	CHAR(50)
DECLARE @cla_sal	SMALLINT
SET NOCOUNT ON 
SET ROWCOUNT 0
/*
SELECT	@cla_sal = cla_sal
FROM	GTH_Contratos
WHERE	fec_con = (SELECT MAX(FEC_CON) FROM GTH_CONTRATOS WHERE cod_emp=@cod_emp)
		AND cod_emp =@cod_emp
*/

--SELECT	@cla_sal = dbo.fn_rhh_ValParmCont (@cod_emp,GETDATE(),'cla_sal',1)
SELECT	@cla_sal = (select	pc.cla_sal 
					from	GTH_ParamContratos pc 
					where	pc.cod_emp = @cod_emp and pc.cod_con = @cod_cont and 
							pc.fec_param = (select MAX(gpc.fec_param) 
											from GTH_ParamContratos gpc 
											where gpc.cod_emp = pc.cod_emp and gpc.cod_con=pc.cod_con and fec_param<=@fec_cte))


--IF @cla_sal = 1  	
--	SELECT @cCadres = Rtrim(@cCaduno)+Rtrim(@cCaddos) 	/* SALARIO ORDINARIO */
--ELSE
--	SELECT @cCadres = Rtrim(@cCaduno)+Rtrim(@cCadtres)	/* SALARIO INTEGRAL */

	

IF @cCaduno = 51  	
	SELECT @cCadres = Rtrim(@cCaddos) 	/* SALARIO ORDINARIO */
ELSE
	IF @cCaduno = 52
	 SELECT @cCadres = Rtrim(@cCadtres) 	/* SALARIO ORDINARIO */
	 ELSE
	 SELECT @cCadres = Rtrim(@cCadcuatro)	/* SALARIO COSTO */
	
	

SELECT @cCadena = 'INSERT INTO #t_resulconta VALUES ( '+CHAR(39)+Rtrim(@cCadres)+CHAR(39)+')'
EXEC ( @cCadena )

```
