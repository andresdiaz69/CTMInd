# View: vW_agendamientocitas_ConOT

## Usa los objetos:
- [[spiga_OrdenesDeTrabajoCitasConOT]]
- [[UnidadDeNegocio]]
- [[Vw_agendamiento_datos_clientes]]

```sql
CREATE view vW_agendamientocitas_ConOT as
select IdEmpresas,               IdCentros,       IdCitas,        Matricula,       FechaCita, 
       FechaAltaCita,            AñoOT,           SerieOT,        NumOT,           DescripcionTrabajos,
       IdCargoTipos,             IdTerceros,      NombreTercero,  IdCitaTipos,     NombreEmpleadoAltaOT,
	   NombreEmpleado,           VIN,             Movil,          Observaciones,   PersonaContacto, 
	   TelefonoPersonaContacto,  NifCifEmpleado,  OrigenCitas,    NombreCentro,    NombreUnidadNegocio,--, un.NombreSeccion 
	   documento,                telefono,        email,          medio,           Motivo_de_no_asistencia,
	   base,                     nombreMarca,     nombreGama,     duplicados
  from (select distinct orden = ROW_NUMBER() over(partition by Matricula,FechaCita,NombreUnidadNegocio order by FechaAltaCita desc),
               IdEmpresas,               IdCentros,          IdCitas,         Matricula,              FechaCita, 
               FechaAltaCita,            AñoOT,              SerieOT,         NumOT,                  DescripcionTrabajos,
               IdCargoTipos,             IdTerceros,         NombreTercero,   IdCitaTipos,            NombreEmpleadoAltaOT,
	           NombreEmpleado,           VIN,                Movil,           Observaciones,          PersonaContacto, 
	           TelefonoPersonaContacto,  NifCifEmpleado,     un.NombreCentro, un.NombreUnidadNegocio, t.telefono,  
			   t.email,                  t.Nifcif documento, base='ConOT',    nombreMarca='na',       nombreGama='na',
			   convert(nvarchar,CONVERT(date,FechaCita))+matricula+convert(nvarchar,IdCentros) duplicados,
			   Motivo_de_no_asistencia='Si Asistió',
			   case when Observaciones like '%OUTLANDER%' then 'INBOUND' 
			        when Observaciones like '%OUTSIDER %' then 'INBOUND' 
			        when Observaciones like '%our%' then 'OUTBOUND' 
			        when Observaciones like '%out%' then 'OUTBOUND' 
					else 'INBOUND' end medio,
			   OrigenCitas = case when OrigenCitas In ('Contact-Guion','Cita WEB') then 'Cita Contact Center'
			                      else OrigenCitas end
          from [PSCService_DB].dbo.spiga_OrdenesDeTrabajoCitasConOT (nolock) ot
          left join UnidadDeNegocio (nolock) un on ot.IdEmpresas  = un.CodEmpresa 
                                               and ot.IdCentros   = un.CodCentro
          left join dbo.Vw_agendamiento_datos_clientes (NOLOCK)	t  on ot.IdTerceros = t.pkterceros	                                                                  
         
         where FechaCita  >= CAST('2020-11-01' AS date)
           and IdCitaTipos =1
           and nombredepartamento not in('Taller Colisión')    
           and CodUnidadNegocio not in(7,4,15,23,5,11,410,411,418,520) ) a
 where orden=1 
```
