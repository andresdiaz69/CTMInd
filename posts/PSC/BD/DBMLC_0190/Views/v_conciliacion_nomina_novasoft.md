# View: v_conciliacion_nomina_novasoft

## Usa los objetos:
- [[Centros]]
- [[Empresas]]
- [[spiga_ContabilidadNovasoft]]
- [[spiga_PUC]]
- [[UnidadDeNegocio]]
- [[VehiculosMarcas]]

```sql
CREATE view [dbo].[v_conciliacion_nomina_novasoft] as
select CodigoCompania=d.cod_cia,NombreCompania=c.NombreEmpresa,CodigoMarca=d.cod_suc,NombreMarca=s.MarcaNovasoft,
CodigoCentro=d.cod_cco,NombreCentro=cc.NombreCentro,CodigoSeccion=d.cod_cl1,
NombreSeccion=c1.NombreSeccion,CodigoDepartamento=d.cod_cl2,
NombreDepartamento=c2.NombreDepartamento,
CodigoUnidadNegocio=d.cod_cl3,
NombreUnidadNegocio=c3.NombreUnidadNegocio,
FechaCorte=d.fec_cte,d.ano_Doc,d.per_doc,FechaDocumento=d.fch_doc,
Cuenta= d.cod_cue,NombreCuenta = p.Nombre,d.cod_ter,d.cod_emp,CodigoConcepto=d.cod_con,NombreConcepto=d.des_con,d.num_doc,
Debito=d.deb_mov,Credito=d.cre_mov
from		[PSCService_DB].dbo.spiga_ContabilidadNovasoft	d
left join	Empresas										c	on	d.cod_cia = c.CodigoEmpresa	
join		VehiculosMarcas									s	on	d.cod_suc = s.CodigoMarca
left join	Centros											cc	on	d.cod_cco = cc.CodigoCentro
left join	UnidadDeNegocio									c1	on	d.cod_cl1 = c1.CodSeccion and d.cod_cco = c1.CodCentro and d.cod_cia = c1.CodEmpresa
left join	UnidadDeNegocio									c2	on	d.cod_cl2 = c2.CodDepartamento and d.cod_cl1 = c2.CodSeccion and d.cod_cco = c2.CodCentro and d.cod_cia = c2.CodEmpresa
left join	UnidadDeNegocio									c3	on	d.cod_cl3 = c3.CodUnidadNegocio and d.cod_cl2 = c3.CodDepartamento and d.cod_cl1 = c3.CodSeccion 
																	and d.cod_cco = c3.CodCentro and d.cod_cia = c3.CodEmpresa
left join	[PSCService_DB].dbo.spiga_PUC					p	on	d.cod_cue = p.CodigoCuenta
--where year(d.fec_cte)=2020
--and month(d.fec_cte)=8
WHERE DATEFROMPARTS(CAST(ano_Doc AS int), CAST(per_doc AS int), 1) >= '20220101' and cod_cue <> '2505951005' -- BY JCS

```
