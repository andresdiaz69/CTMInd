# View: vw_Seedz_Items

## Usa los objetos:
- [[ComisionesSpigaTallerPorOT]]
- [[spiga_ReferenciasJD]]

```sql


CREATE view [dbo].[vw_Seedz_Items]  as
select Id,cnpjOrigemDados,DataCadastro,DataAtualizacao,Sku,Descricao,Branding,Um,Tipo,Grupo
from(
	select distinct Id=PkReferencias,
	
	cnpjOrigemDados='830004993-8',
	
	DataCadastro=FechaAlta,DataAtualizacao=FechaMod,
	Sku=PkReferencias,Descricao=DescripcionReferencia,Branding=PkFkMR,
	Um=case when FkUnidadesMedida = 1 then 'UNIDADES'
			when FkUnidadesMedida = 6 then 'GALON'
			when FkUnidadesMedida = 9 then 'METROS' else 'N/A' END,
	Tipo='Producto',Grupo= DescripcionClasificacion1
	from [PSCService_DB].dbo.spiga_ReferenciasJD
	UNION ALL
	SELECT distinct Id=codigo,
	
	cnpjOrigemDados='830004993-8',
	
	DataCadastro=FechaFactura,DataAtualizacao=FechaFactura,
	Sku=Codigo,Descricao=Descripcion,Branding='JOH',Um='HORAS',Tipo='Servicio',
	Grupo='ManoObra'
	FROM [DBMLC_0190].dbo.ComisionesSpigaTallerPorOT a
	where TipoOperacion in ('MO','VAR','PIN','SUB')
	and CodigoCentro in (16,18,21,22,23,25,26,29,41,43,44,46,49,65,124,153)
) a

```
