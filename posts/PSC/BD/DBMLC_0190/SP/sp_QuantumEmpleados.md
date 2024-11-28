# Stored Procedure: sp_QuantumEmpleados

## Usa los objetos:
- [[gen_tipide]]
- [[QuantumEmpleados]]
- [[rhh_emplea]]
- [[rhh_tipcon]]

```sql
CREATE PROCEDURE [dbo].[sp_QuantumEmpleados]
	@Empresa smallint, 
	@Año smallint,
	@Mes smallint
AS
BEGIN


	SET NOCOUNT ON;

	declare @FechaHasta datetime​

	set @Fechahasta = DATEADD(s,-1,DATEADD(mm, DATEDIFF(m,0,DATEFROMPARTS ( @Año, @Mes, 1 ))+1,0))

	delete from QuantumEmpleados where Año = @Año and Mes = @Mes and ((@Empresa = 6 and Empresa = 6) or (@Empresa = 5 and Empresa = 5) or (@Empresa = 1 and Empresa in (1, 22)))  

	insert into QuantumEmpleados
		select @Año,@Mes,@Empresa,cedula= e.cod_emp,Nombres=e.nom_emp,Apellidos=e.ap1_emp + ' ' + e.ap2_emp, e.tip_ide,
		DescripcionTipoIde=i.des_tip,e.tip_con,DescrpcionTipoCon = t.nom_con,e.fec_ing​
		from		Novasoft_CT_MM..rhh_emplea	e​
		left join	Novasoft_CT_MM..gen_tipide	i	on	e.tip_ide = i.cod_tip​
		left join	Novasoft_CT_MM..rhh_tipcon	t	on	e.tip_con = t.tip_con​
		where cod_emp <> '0'​
		and (fec_egr is null or fec_egr > @Fechahasta)​
		and fec_ing <= @Fechahasta​
		and ((@Empresa = 6 and cod_cia = 6) or (@Empresa = 5 and cod_cia = 5) or (@Empresa = 1 and cod_cia in (1, 22)))		
END

```
