# Stored Procedure: usr_rs_rhh_NOMU9005_1

## Usa los objetos:
- [[fn_rhh_ValParmCont]]
- [[gen_compania]]
- [[gen_tipide]]
- [[rhh_BenefEmp]]
- [[rhh_beneficio]]
- [[rhh_cargos]]
- [[rhh_cauretiro]]
- [[rhh_emplea]]
- [[rhh_hislab]]
- [[rhh_liqhis]]
- [[rhh_tipcon]]
- [[sp_gen_dp]]
- [[usr_rhh_concepcert]]

```sql

-- =============================================
-- Author:		<Edwin G. Rodriguez Alonso>
-- Create date: <26/04/2018>
-- Description:	<Consulta para certificaciones activos y retirados NOMU9005>
--	EXEC usr_rs_rhh_NOMU9005 '1010160693','20171010',0
-- =============================================
CREATE procedure [dbo].[usr_rs_rhh_NOMU9005_1]
		@cod_emp	char(12)	= '79524970',
		@fec_cer	datetime	=	'20190331',
		@REPO		BIT			=	0 /* 1 si es certificado de retirados */
as

declare	@fec_ini	datetime,
		@fec_fin	datetime,
		@fec_ing	datetime,
		@fec_ret	datetime,
		@nom_ret	char(25),
		@cod_cont	int,
		@consulta	nvarchar(max),
		@paramconsulta	nvarchar(max),
		@SUMA1		MONEY,
		@cargo		char(8),
		@cod_cia	char(3),
		@sueldo		money,
		@tip_con	char(2),
		@dia_cer	varchar(100),
		@garantizado smallint = 0

declare @bonos table (nombre varchar(50) collate database_default,valor money)

set		@dia_cer= case day(@fec_cer) when 1 then 'un' when 2 then 'dos' when 3 then 'tres' when 4 then 'cuatro' when 5 then 'cinco' when 6 then 'seis' when 7 then 'siete' when 8 then 'ocho'
									when 9 then 'nueve' when 10 then 'diez' when 11 then 'once' when 12 then 'doce' when 13 then 'trece' when 14 then 'catorce' when 15 then 'quince' when 16 then 'dieciséis'
									when 17 then 'diecisiete' when 18 then 'dieciocho' when 19 then 'diecinueve' when 20 then 'veinte' when 21 then 'veintiuno' when 22 then 'veintidós' when 23 then 'veintitrés'
									when 24 then 'veinticuatro' when 25 then 'veinticinco' when 26 then 'veintiséis' when 27 then 'veintisiete' when 28 then 'veintiocho' when 29 then 'veintinueve'
									when 30 then 'treinta' else 'treinta y uno' end

select	@cod_cont = cod_con, @cargo = cod_car, @sueldo = sal_bas, @tip_con = tip_con, @cod_cia = cod_cia
from	rhh_hislab
where	cod_emp=@cod_emp and fec_ini=(	select	max(fec_ini) 
										from	rhh_hislab 
										where	cod_emp=@cod_emp and fec_ini<=@fec_cer)

select	@fec_ing=min(fec_ini), @fec_ret=max(fec_ret)
from	rhh_hislab hl
where	hl.cod_emp=@cod_emp and hl.cod_con=@cod_cont

select	@nom_ret = r.nom_ret
from	rhh_hislab hl 
		inner join rhh_cauretiro r on r.cau_ret=hl.cau_ret 
where	hl.cod_emp=@cod_emp and hl.cod_con=@cod_cont and hl.fec_ret=@fec_ret

/**//**//*	I	*/
/**//**//*	Modificado Edwin G. Rodriguez Alonso 20180809 1120 - La siguiente es la instruccion original	*/
/**//**/
/*
select	@fec_fin=MIN(fec_cte)
from	rhh_liqhis
where	cod_emp=@cod_emp and fec_cte>=@fec_cer
*/
/**//**//*	Por solicitud del cliente se toma desde el ultimo dia del mes anterior a la fecha de certificacion, solicitud enviada por correo electronico de Camilo Cespedes*/
SET @fec_fin = EOMONTH(DATEADD(M,-1,@fec_cer))
/**//**//*	F	*/

IF @REPO=1 /* Busca la fecha de corte del retiro */
BEGIN
	select	@fec_fin=MIN(fec_cte)
	from	rhh_liqhis
	where	cod_emp=@cod_emp and fec_cte>=@fec_ret AND cod_cont=@cod_cont
END

if @fec_fin is null or @fec_fin='19000101'
begin
	select	@fec_fin=EOMONTH(DATEADD(M,-1,@fec_cer))
	select	@fec_ini=DATEADD(D,1,EOMONTH(DATEADD(M,-11,@fec_cer)))
end
ELSE
BEGIN
	IF @REPO=0
		select	@fec_ini=DATEADD(D,1,EOMONTH(DATEADD(M,-12,@fec_fin)))
	ELSE
		select	@fec_ini=DATEADD(D,1,DATEADD(M,-12,@fec_fin))
END

set @consulta='	select	@suma=SUM(CASE NAT_LIQ WHEN 1 THEN VAL_LIQ WHEN 2 THEN -VAL_LIQ ELSE 0 END)
				from	rhh_liqhis h
						INNER JOIN usr_rhh_concepcert c on  h.cod_con=c.cod_con and (c.nombre is null or c.nombre = '''')
				where	cod_emp='''+@cod_emp+''' and fec_cte >= '''+CONVERT(VARCHAR,@fec_ini,112)+''' and fec_cte <= '''+CONVERT(VARCHAR,@fec_fin,112)+''''

SET @paramconsulta = N'@suma money OUTPUT'
	
EXECUTE	sp_executesql @consulta, @paramconsulta,
	@suma = @SUMA1 OUTPUT
		

insert into @bonos
/**//**//*	I	*/
/**//**//*	Modificado Edwin G. Rodriguez Alonso 20180828 1130 - La siguiente es la instruccion que habia	*/
/**//**/
/*
select	c.nombre,sum(val_liq) valor
from	rhh_liqhis h
		inner join usr_rhh_concepcert c on h.cod_con = c.cod_con and c.nombre is not null and c.nombre<>''
where	cod_emp=@cod_emp and fec_cte >=@fec_ini and fec_cte<=@fec_fin
group	by c.nombre
*/
/**//**//*	Se cambia a la tabla de beneficios, de acuerdo a conversacion que se tuvo con la usuaria en la implementacion que se hizo con la 
			consultora Paola Jimenez	
			NOTA 1	*/
select	c.nombre,sum(val_ben) valor
from	rhh_BenefEmp h
		inner join rhh_beneficio b on h.cod_ben=b.cod_ben
		inner join usr_rhh_concepcert c on b.cod_con = c.cod_con and c.nombre is not null and c.nombre<>''
where	h.cod_emp=@cod_emp 
		and h.fec_ini = (select	max(fec_ini) 
						from	rhh_benefemp
						where	cod_emp = h.cod_emp and cod_ben=h.cod_ben)
		and isnull(fec_fin,@fec_cer)>=@fec_cer
group	by c.nombre
/**//**//*	F	*/

if	@fec_ini>@fec_ing
begin
	set @SUMA1 = round(@SUMA1/12,0)
	/**//**//*	I	*/
	/**//**//*	Comentareado Edwin G. Rodriguez Alonso 20180828	*/
	/**//**//*	De acuerdo con nota 1	*/
	--update	 @bonos set valor = round(valor/12,0)
	/**//**//*	F	*/
end
else
begin
	
	declare @dias int

	exec sp_gen_dp @FECHA1 = @fec_ing, @FECHA2 = @fec_fin, @diferencia = @dias output

	set @SUMA1 = round(@SUMA1/@dias*30,0)
	/**//**//*	I	*/
	/**//**//*	Comentareado Edwin G. Rodriguez Alonso 20180828	*/
	/**//**//*	De acuerdo con nota 1	*/
	--update	 @bonos set valor = round(valor/@dias*30,0)
	/**//**//*	F	*/
end


if	not exists (select * from @bonos)
	insert into @bonos values (null,null)

select	upper(rtrim(e.nom_emp)+' '+RTRIM(e.ap1_emp)+' '+RTRIM(e.ap2_emp)) nombres
		,e.num_ide,(SELECT tip_tip FROM gen_tipide WHERE cod_tip=E.tip_ide) tipide
		,tc.nom_con duracion
		--,case tc.tip_dur when 1 then 'Fijo' when 2 then 'Indefinido' else 'No Aplica(Sector Oficial)' end duracion Comentareado Fladir Aldana Usuario requiere Nombre del tipo de contrato.
		,right('00'+CONVERT(varchar,DAY(@fec_ing)),2)+' de ' + DATENAME(m,@fec_ing)+' ' + convert(varchar,year(@fec_ing)) ingreso
		,upper(car.nom_car) cargo
		,@sueldo sueldo
		,case DBO.fn_rhh_ValParmCont(E.COD_EMP,@fec_cer,'CLA_SAL',0) when 1 then 'Básico' when 2 then 'Integral' else '#ERR' end clasal
		,case when e.ind_svar = 1 then @SUMA1 else 0 end SUMA1
		,@dia_cer+' ('+right('00'+CONVERT(varchar,DAY(@fec_cer)),2)+') días del mes de ' + datename(m,@fec_cer) + ' de ' + convert(varchar,year(@fec_cer)) feccer
		,right('00'+CONVERT(varchar,DAY(@fec_ret)),2)+' de ' + DATENAME(m,@fec_ret)+' ' + convert(varchar,year(@fec_ret)) fec_ret,@nom_ret nom_ret
		,b.*
		,cia.nom_cia, cia.nit_cia, cia.dig_ver
from	rhh_emplea e
		inner join rhh_tipcon tc on tc.tip_con=@tip_con
		inner join rhh_cargos car on car.cod_car = @cargo
		inner join gen_compania cia on cia.cod_cia=@cod_cia
		cross join @bonos b
where	e.cod_emp = @cod_emp

```
