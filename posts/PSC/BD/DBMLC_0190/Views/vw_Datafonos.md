# View: vw_Datafonos

## Usa los objetos:
- [[Empresas]]
- [[spiga_Datafonos]]
- [[UnidadDeNegocio]]

```sql
CREATE view [dbo].[vw_Datafonos] as
select distinct pkfkempresas IdEmpresa,      NombreEmpresa,            NombreCentro,                
       DescripcionCaja NombreCaja,           PkTpvs_Iden idDatafono,   Descripcion NombreDatafono
  from [PSCService_DB].dbo.spiga_Datafonos (nolock) d
  left join [DBMLC_0190].dbo.UnidadDeNegocio (nolock) u on u.codempresa = d.pkfkempresas
                                                       and u.CodCentro  = d.PkFkCentros
  left join [DBMLC_0190].dbo.empresas (nolock) e on e.CodigoEmpresa =  d.PkFkEmpresas

```
