# View: vw_inventario_marca

## Usa los objetos:
- [[spiga_InventarioRepuestosResumido]]
- [[UnidadDeNegocio]]

```sql
CREATE view [dbo].[vw_inventario_marca] as 
select Ano_Periodo,Mes_Periodo,IdEmpresas,NombreEmpresa,CodigoMarca,NombreMarca,Valor=sum(valor)
from (
		select Ano_Periodo,Mes_Periodo,IdEmpresas,NombreEmpresa,
		CodigoMarca=case when CodUnidadNegocio = 20 and Idcentros = 108 then 99 else CodUnidadNegocio end,
		NombreMarca=case when CodUnidadNegocio = 20 and Idcentros = 108 then 'Mitsubishi Mayorista' else NombreUnidadNegocio end,
		Valor=sum(ValorPM)
		from(
			select i.Ano_Periodo,i.Mes_Periodo,i.IdEmpresas,i.NombreEmpresa,n.CodUnidadNegocio,n.NombreUnidadNegocio,i.IdCentros,i.NombreCentro,ValorPM=sum(i.ValorPM)
			,i.IdSecciones,i.DescripcionSeccion,i.DescripcionMR
			from		[PSCService_DB].dbo.spiga_InventarioRepuestosResumido	i
			left join	UnidadDeNegocio	n	on	i.IdEmpresas = n.CodEmpresa
												and i.IdCentros = n.CodCentro
												and i.IdSecciones = n.CodSeccion
			--where i.Ano_Periodo = 2021
			--and i.Mes_Periodo = 5
			--and n.NombreUnidadNegocio like '%MIT%'
			group by i.Ano_Periodo,i.Mes_Periodo,i.IdEmpresas,i.NombreEmpresa,n.CodUnidadNegocio,n.NombreUnidadNegocio,i.IdCentros,i.NombreCentro,
			i.IdSecciones,i.DescripcionSeccion,i.DescripcionMR
		)a 
		--where Ano_Periodo = 2021
		--and Mes_Periodo = 5
		group by Ano_Periodo,Mes_Periodo,IdEmpresas,NombreEmpresa,CodUnidadNegocio,NombreUnidadNegocio,IdCentros
)b group by Ano_Periodo,Mes_Periodo,IdEmpresas,NombreEmpresa,CodigoMarca,NombreMarca 

```
