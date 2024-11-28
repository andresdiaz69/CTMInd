# View: vw_VacacionesConsolidados

## Usa los objetos:
- [[gen_ccosto]]
- [[gen_clasif1]]
- [[gen_clasif2]]
- [[gen_clasif3]]
- [[gen_clasif5]]
- [[gen_compania]]
- [[gen_sucursal]]
- [[rhh_ConsVaca]]
- [[rhh_emplea]]

```sql

CREATE view [dbo].[vw_VacacionesConsolidados] as
--Consolidado vacaciones
select CedulaEmpleado = v.cod_emp,NombreEmpleado = e.nom_emp + ' ' + e.ap1_emp + ' ' + e.ap2_emp,FechaLiquidacion = eomonth(v.fec_liq),FechaIngreso=v.fec_ing,DiasCausados= v.Dia_cau,
DiasTotalesVacaciones = v.Dia_tot_vac,DiasPeriodoAcumulados = v.dia_per_acum,
DiasPendientes = (v.Dia_tot_vac - v.dia_per_acum),SalarioBasico = v.sal_bas,SalarioPromedio = v.sal_prom, ValorVacaciones = v.val_vac,ValorProvision = v.val_provi,
ValorVacacacionesPagadas = v.Val_VacPag,ValorDiferencia = v.val_dife,
CodigoCompania = v.cod_cia,NombreCompania = c.nom_cia,CodigoMarca = v.cod_suc, NombreMarca = s.nom_suc,
CodigoCentro = v.cod_cco,NombreCentro = cc.nom_cco,CodigoSeccion = v.cod_cl1,NombreSeccion = c1.nombre,CodigoDepartamento = v.cod_cl2,NombreDepartamento = c2.nombre,
CodigoUnidadNegocio = v.cod_cl3,NombreUnidadNegocio = c3.nombre,CodigoSede = v.cod_cl5,NombreSede = c5.nombre
from		[Novasoft_CT_MM].dbo.rhh_ConsVaca		v
left join	[Novasoft_CT_MM].dbo.rhh_emplea			e	on	v.cod_emp = e.cod_emp
left join	[Novasoft_CT_MM].dbo.gen_compania        c	on	v.cod_cia = c.cod_cia
left join	[Novasoft_CT_MM].dbo.gen_sucursal		s	on	v.cod_suc = s.cod_suc
left join	[Novasoft_CT_MM].dbo.gen_ccosto			cc	on	v.cod_cco = cc.cod_cco
left join	[Novasoft_CT_MM].dbo.gen_clasif1			c1	on	v.cod_cl1 = c1.codigo
left join	[Novasoft_CT_MM].dbo.gen_clasif2			c2	on	v.cod_cl2 = c2.codigo
left join	[Novasoft_CT_MM].dbo.gen_clasif3			c3	on	v.cod_cl3 = c3.codigo
left join	[Novasoft_CT_MM].dbo.gen_clasif5			c5	on	v.cod_cl5 = c5.codigo
--where year(v.fec_liq)=2019
--and month(v.fec_liq)=12
--and v.cod_emp = '1022369345'

```
