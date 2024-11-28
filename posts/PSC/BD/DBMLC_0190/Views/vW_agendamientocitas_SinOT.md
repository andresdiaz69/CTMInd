# View: vW_agendamientocitas_SinOT

## Usa los objetos:
- [[spiga_OrdenesDeTrabajoCitasSinOT]]
- [[UnidadDeNegocio]]
- [[Vw_agendamiento_datos_clientes]]

```sql
CREATE view vw_Agendamientocitas_SinOT as
select IdEmpresas,               IdCentros,       IdCitas,        Matricula,       FechaCita, 
       FechaAltaCita,            AñoOT,           SerieOT,        NumOT,           DescripcionTrabajos,
       IdCargoTipos,             IdTerceros,      NombreTercero,  IdCitaTipos,     NombreEmpleadoAltaOT,
	   NombreEmpleado,           VIN,             Movil,          Observaciones,   PersonaContacto, 
	   TelefonoPersonaContacto,  NifCifEmpleado,  OrigenCitas,    NombreCentro,    NombreUnidadNegocio,
	   documento,                telefono,        email,          medio,           Motivo_de_no_asistencia,
	   base,                     nombreMarca,     nombreGama,     duplicados
  from (select distinct orden = ROW_NUMBER() over(partition by Matricula,FechaCita,NombreUnidadNegocio order by FechaAltaCita desc),
               IdEmpresas,               IdCentros,          IdCitas,         Matricula,              FechaCita, 
               FechaAltaCita,            AñoOT='0',          SerieOT='NA',    NumOT=0,                DescripcionTrabajos='NA',
               IdCargoTipos='NA',        IdTerceros,         NombreTercero,   IdCitaTipos,            NombreEmpleadoAltaOT,
	           NombreEmpleado,           VIN,                Movil,           Observaciones,          PersonaContacto, 
	           TelefonoPersonaContacto,  NifCifEmpleado,     un.NombreCentro, un.NombreUnidadNegocio, t.telefono,  
			   t.email,                  t.Nifcif documento, base='SinOT',    nombreMarca,            nombreGama,		
			   convert(nvarchar,CONVERT(date,FechaCita))+matricula+convert(nvarchar,IdCentros)    duplicados,
			   Motivo_de_no_asistencia= case when IdMotivoCita =0  then 'Cero'
			                                 when IdMotivoCita =1  then 'Olvido'
											 when IdMotivoCita =2  then 'Viaje'
											 when IdMotivoCita =3  then 'Pico y Placa'
											 when IdMotivoCita =4  then 'Otro Taller'
											 when IdMotivoCita =5  then 'Reprogramación'
											 when IdMotivoCita =6  then 'No Localizado'
											 when IdMotivoCita =7  then 'Cliente no Informa razones'
											 when IdMotivoCita =8  then 'Inconveniente de última hora'
											 when IdMotivoCita =9  then 'Cliente informa que se comunica para re-agendar'
											 when IdMotivoCita =10 then 'Asiste pero no abren OT desde la cita'
											 when IdMotivoCita =11 then 'Asiste no abren OT'
											 when IdMotivoCita IS null then 'Sin Motivo'end,
			   case when Observaciones like '%OUTLANDER%' then 'INBOUND' 
			        when Observaciones like '%OUTSIDER %' then 'INBOUND' 
			        when Observaciones like '%our%' then 'OUTBOUND' 
			        when Observaciones like '%out%' then 'OUTBOUND' 
					else 'INBOUND' end medio,
			   OrigenCitas = case when OrigenCitas In ('Contact-Guion','Cita WEB') then 'Cita Contact Center'
			                      else OrigenCitas end
          from [PSCService_DB].dbo.spiga_OrdenesDeTrabajoCitasSinOT ot
          left join UnidadDeNegocio (nolock) un on ot.IdEmpresas  = un.CodEmpresa 
                                               and ot.IdCentros   = un.CodCentro
          left join dbo.Vw_agendamiento_datos_clientes (NOLOCK)	t  on ot.IdTerceros = t.pkterceros	    

         where FechaCita  >= CAST('2020-11-01' AS date)
           and IdCitaTipos =1
		   and ot.FechaBaja is null
           and nombredepartamento not in('Taller Colisión')    
           and CodUnidadNegocio not in(7,4,15,23,5,11,410,411,418,520) ) a
 where orden=1 



```
