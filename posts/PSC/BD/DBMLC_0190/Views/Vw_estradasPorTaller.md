# View: Vw_estradasPorTaller

## Usa los objetos:
- [[spiga_EntradasATaller]]
- [[UnidadDeNegocio]]

```sql
CREATE view Vw_estradasPorTaller as
select FechaDeCorte,             FechaEntrada,              Matricula,             IdEmpresas,                IdCentros,
       SerieOT,                  NumOT,                     AñoOT,                 NumTrabajo,                Descripcion,
       VIN,                      NombreMarca,               NombreGama,            DescripcionRecepcion,      DescripcionTrabajoTipos,
       DescripcionMotivoEntrada, IdCargoTipos,              IdTerceros,            nombre_cliente,            FechaAlta,          
	   FechaPrevistaEntrega,     FechaEntrega,              FechaCierre,           DiferenciaDias,            FechaMatriculacion, 
	   DescripcionSegmento,      NombrePropietario,         TelefonoParticular,    TelefonoMovil,             Email,             
	   NombreAsesor,             AsesorServicioResponsable, Nombre_Vendedor,       NombreEstado,              FechaModificacion,  
	   NombreSeccion,     	     NombreCentro,              NombreUnidadNegocio
      
 from (SELECT distinct orden2 = ROW_NUMBER() over(partition by vin,SerieOT,NombreUnidadNegocio,NumOT,AñoOT,IdCentros order by fechamodificacion desc),
              FechaDeCorte,               FechaEntrada,       Matricula,             IdEmpresas,                IdCentros,
              SerieOT,                    NumOT,              AñoOT,                 NumTrabajo,                Descripcion,
              VIN,                        NombreMarca,        NombreGama,            DescripcionRecepcion,      DescripcionTrabajoTipos,
              DescripcionMotivoEntrada,   IdCargoTipos,       IdTerceros,            FechaAlta,                 FechaPrevistaEntrega,  
			  FechaEntrega,               FechaCierre,        DiferenciaDias,        FechaMatriculacion,        DescripcionSegmento,   
			  NombrePropietario,          TelefonoParticular, TelefonoMovil,         Email,                     NombreAsesor,          
			  AsesorServicioResponsable,  NombreEstado,       FechaModificacion,     NombreSeccion,             NombreCentro, 
			  NombreUnidadNegocio  ,     nombre_cliente,      nombre_vendedor		
         FROM (SELECT distinct orden = ROW_NUMBER() over(partition by Matricula,fechaentrada,NombreUnidadNegocio order by fechaentrada desc),              
                      FechaDeCorte,               FechaEntrada,       Matricula,             IdEmpresas,                IdCentros,
                      SerieOT,                    NumOT,              AñoOT,                 NumTrabajo,                Descripcion,
                      VIN,                        NombreMarca,        NombreGama,            DescripcionRecepcion,      DescripcionTrabajoTipos,
                      DescripcionMotivoEntrada,   IdCargoTipos,       IdTerceros,            FechaAlta,                 FechaPrevistaEntrega,  
			          FechaEntrega,               FechaCierre,        DiferenciaDias,        FechaMatriculacion,        DescripcionSegmento,   
			          NombrePropietario,          TelefonoParticular, TelefonoMovil,         Email,                     NombreAsesor,          
			          AsesorServicioResponsable,  NombreEstado,       FechaModificacion,     et.NombreSeccion,          un.NombreCentro, 
			          un.NombreUnidadNegocio  ,
			          isnull(NombreCalle,'') +' '+  isnull(Apellido1TerceroCargo,'') +' '+ isnull(Apellido2TerceroCargo,'')   nombre_cliente,
			          isnull(NombreVendedor,'')  +' '+  isnull(Apellido1Vendedor,'')  +' '+  isnull(Apellido2Vendedor,'')  nombre_vendedor		
                 FROM PSCService_DB.dbo.spiga_EntradasATaller (nolock) et
                 left join UnidadDeNegocio (nolock) un on et.IdEmpresas  = un.CodEmpresa 
                                                      and et.IdCentros   = un.CodCentro
									                  and et.IdSecciones = un.CodSeccion
                WHERE FechaEntrada >= CAST('2020-11-01' AS date)
                  --and nombredepartamento not in('Taller Colisión')    
                  and CodUnidadNegocio not in(7,4,15,23,5,11,410,411,418,520)
                  and et.NombreSeccion not like '%bou%'
                  and Descripcion not like '%alist%')a 
       where orden  = 1)a
where orden2  = 1
 -- and orden2 = 1
 -- and matricula ='IGY519'
 -- AND numot = 56655
--select  * FROM PSCService_DB.dbo.spiga_EntradasATaller 


```
