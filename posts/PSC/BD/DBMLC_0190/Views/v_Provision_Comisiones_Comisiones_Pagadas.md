# View: v_Provision_Comisiones_Comisiones_Pagadas

## Usa los objetos:
- [[vw_Spiga_MovimientoContable]]

```sql
CREATE view [dbo].[v_Provision_Comisiones_Comisiones_Pagadas] as
select Año,mes,Empresa,NombreEmpresa,Centro,nombrecentro,Cuenta,Saldo=sum(Saldo)
from(
	select Empresa,NombreEmpresa,
		Centro = case	when centro = 79 then 81
						when centro = 59 then 12
						when centro = 150 then 5
						when (centro = 54 and seccion = 614) then 7
						when (centro = 54 and seccion = 613)  then 53
						when centro = 73 then 2
						when centro = 58 then 147
						when (centro = 51 and seccion = 616) then 1
						when (centro = 51 and seccion = 615) then 50
						when centro = 68 then  66
						when centro = 64 then  20
						when (centro = 69 and seccion = 606) then 70
						when (centro = 69 and seccion = 607) then 71
						when (centro = 69 and seccion = 605) then 19
						when (centro = 69 and seccion = 604) then 72
				else centro end ,
	nombrecentro = case	when centro = 79 then 'MIT-Bta-AV 68'
						when centro = 59 then 'RN-Bta-Av.Ciudad Cali'
						when centro = 150 then 'MZ-Bta-Cl.155'
						when (centro = 54 and seccion = 614) then 'FR-Bta-Cl.170'
						when (centro = 54 and seccion = 613)  then 'VW-Bta-Cl.170'
						when centro = 73 then 'MZ-Bta-Cra.30'
						when centro = 58 then 'FR-Bta.-AV 68'
						when (centro = 51 and seccion = 616) then 'RN-Bta-P.Aranda'
						when (centro = 51 and seccion = 615) then 'VW-Bta-P. Aranda'
						when centro = 68 then  'RN-Ibague-Z.I. Mirolindo'
						when centro = 64 then  'MZ-Neiva-Cra.5'
						when (centro = 69 and seccion = 606) then 'FR-Villavo-Anillo Vial 1'
						when (centro = 69 and seccion = 607) then 'MZ-Villavo-Anillo Vial 1'
						when (centro = 69 and seccion = 605) then 'RN-Villavo-Torre'
						when (centro = 69 and seccion = 604) then 'VW-Villavo-Anillo Vial 1'
				else nombrecentro end ,
	Seccion,NombreSeccion,
	cuenta,Debe=sum(debe),Haber=sum(haber),Saldo = sum(debe)-sum(haber),año=year(Fechaasiento),mes=month(FechaAsiento)
	from vw_Spiga_MovimientoContable
	where cuenta = '6135040518'
	and Empresa in (1,5,6,22)
	--and year(Fechaasiento)=2020
	--and month(FechaAsiento) = 5
	--and month(FechaAsiento) <=4
	group by Empresa,NombreEmpresa,Centro,NombreCentro,cuenta,Seccion,NombreSeccion,fechaAsiento
)a group by año,mes,Empresa,NombreEmpresa,Centro,nombrecentro,Cuenta
--order by nombrecentro

```
