# Stored Procedure: usr_basecertif

## Usa los objetos:
- [[fn_rhh_ContratoFch]]
- [[rhh_emplea]]
- [[rhh_liqhis]]
- [[usr_basescert]]
- [[usr_concert]]
- [[v_rhh_concep]]

```sql

CREATE PROCEDURE [dbo].[usr_basecertif](
	@ccempleado	char(12)='79690284',
	@fechacert	date = '20160610'
)

as


declare @ContVigente	int
declare	@rango1		date,
		@rango2		date,
		@totextras	money,
		@promextra	money,
		@totcomisi	money,
		@promcom		money,
		@diasprome	int


select @ccempleado=cod_emp,
		@fechacert= fechacert,
		@rango1  = fecrango1,
		@rango2	 = fecrango2,
		@totextras	= totextras,
		@promextra	= promextras,
		@totcomisi	= totcomisi,
		@promcom	= promcomi,
		@diasprome = diasprom
   from usr_basescert where cod_emp=@ccempleado

SET @ContVigente = dbo.fn_rhh_ContratoFch (@ccempleado, @fechacert, 0)

   --select * from usr_basescert
	SELECT  lh.cod_emp,lh.cod_con,val_liq,can_liq,convert(date,fec_cte) AS FEC_CTE,E.ap1_emp,E.nom_emp,V.nom_con,@diasprome as diasprome, 
	@rango1 as rango1,@rango2 as rango2,@totextras as totextras,@promextra as promextra,@totcomisi as totcomi,@promcom as promcomision,
	'extras' as tipo
	
	from rhh_liqhis lh 
	inner join rhh_emplea E ON lh.cod_emp=E.cod_emp 
	inner join v_rhh_concep V ON lh.cod_con=V.cod_con and lh.mod_liq = V.mod_liq
	where	lh.cod_emp = RTRIM(CONVERT(CHAR,@ccempleado))  
													 and lh.cod_cont =  + RTRIM(CONVERT(CHAR,@ContVigente))  
													 and lh.nat_liq = 1 
													 and lh.tip_liq = '01' 
													 and lh.fec_cte between @rango1 and @rango2
													 and lh.cod_con in (select concepto   from usr_concert where tipocon='extras')

	UNION ALL

	SELECT  lh.cod_emp,lh.cod_con,val_liq,can_liq,convert(date,fec_cte) AS FEC_CTE,E.ap1_emp,E.nom_emp,V.nom_con,@diasprome as diasprome,
	@rango1 as rango1,@rango2 as rango2,@totextras as totextras,@promextra as promextra,@totcomisi as totcomi,@promcom as promcomision,
	'comisiones' as tipo

	from rhh_liqhis lh 
	inner join v_rhh_concep V ON lh.cod_con=V.cod_con and lh.mod_liq = V.mod_liq
	inner join rhh_emplea E ON lh.cod_emp=E.cod_emp  where	lh.cod_emp = RTRIM(CONVERT(CHAR,@ccempleado))  
													 and lh.cod_cont =  + RTRIM(CONVERT(CHAR,@ContVigente))  
													 and lh.nat_liq = 1 
													 and lh.tip_liq = '01' 
													 and lh.fec_cte between @rango1 and @rango2
													 and lh.cod_con in (select concepto   from usr_concert where rtrim(tipocon)='comision')

													


```
