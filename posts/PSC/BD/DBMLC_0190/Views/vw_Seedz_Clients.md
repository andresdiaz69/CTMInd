# View: vw_Seedz_Clients

## Usa los objetos:
- [[spiga_ContabilidadMovimientos]]
- [[Spiga_Terceros]]
- [[vw_TercerosCelularUltimaFechaActualizacion]]
- [[vw_TercerosCorreoUltimaFechaActualizacion]]
- [[vw_TercerosTelefonoFijoUltimaFechaActualizacion]]

```sql

CREATE view [dbo].[vw_Seedz_Clients] as
select distinct Num=ROW_NUMBER() over(order by NifCif  asc),
cnpjOrigemDados='8300049938',dataCadastro=FechaAlta,dataAtualizacao=FechaMod,Id=Cod,--PkTerceros,
RazaoSocial= convert(varchar,isnull(Nombre,' ')) + ' ' + convert(varchar,isnull(apellido1,' ')) + ' ' + convert(varchar,isnull(apellido2,' ')),
NomeFantasia=NombreComercial,Documento=NifCif,situacaoFinanceira=1,Email=r.email,Celular=c.Numero
from		[PSCService_DB].dbo.Spiga_Terceros				t
left join	vw_TercerosCelularUltimaFechaActualizacion		c	on	t.PkTerceros = c.PkFkTerceros
left join	vw_TercerosTelefonoFijoUltimaFechaActualizacion	f	on	t.PkTerceros = f.PkFkTerceros
left join	vw_TercerosCorreoUltimaFechaActualizacion		r	on	t.PkTerceros = r.PkFkTerceros
left join	(SELECT distinct cod= a.CodigoTercero 
			FROM [PSCService_DB].dbo.spiga_ContabilidadMovimientos a					  
			WHERE a.TipoFactura='E' AND a.IdEmpresas = 1 AND a.NombreCentro LIKE 'JD%' AND a.CodigoTercero IS NOT NULL )
			m	on		t.PkTerceros = cod	
where cod is not null

```
